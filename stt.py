import json
import base64
import asyncio

import requests
import pyaudio
import websockets


FRAMES_PER_BUFFER = 3200
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000
p = pyaudio.PyAudio()

# starts recording
stream = p.open(
    format=FORMAT,
    channels=CHANNELS,
    rate=RATE,
    input=True,
    frames_per_buffer=FRAMES_PER_BUFFER
)

URL = "wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000"


async def send_receive():
    print(f'Connecting websocket to url ${URL}')
    async with websockets.connect(
            URL,
            extra_headers=(("Authorization", "8209d9a235da421b9cee1305c901b2de"),),
            ping_interval=5,
            ping_timeout=20
    ) as _ws:
        await asyncio.sleep(0.1)
        print("Receiving Session Begins ...")
        session_begins = await _ws.recv()
        print(session_begins)
        print("Sending messages ...")

        async def send():
            while True:
                try:
                    data = stream.read(FRAMES_PER_BUFFER)
                    data = base64.b64encode(data).decode("utf-8")
                    json_data = json.dumps({"audio_data": str(data)})
                    await _ws.send(json_data)
                except websockets.exceptions.ConnectionClosedError as e:
                    print(e)
                    assert e.code == 4008
                    break
                except Exception as e:
                    assert False, "Not a websocket 4008 error"
                await asyncio.sleep(0.01)

            return True

        async def receive():
            while True:
                try:
                    result_str = await _ws.recv()
                    print(json.loads(result_str)['text'])

                    processStatusRequest = requests.get('http://localhost:4200/api/status/processing')
                    classificationStatusRequest = requests.get('http://localhost:4200/api/status/classification')
                    if not processStatusRequest.ok or not classificationStatusRequest.ok:
                      print('Error: Cannot find request')

                    isProcessing = processStatusRequest.json()["value"] == True
                    isClassifying = classificationStatusRequest.json()["value"] == True

                    if(isProcessing and not isClassifying):
                      value = None
                      value = json.loads(result_str)['text']
                      payload = {"value": value}
                      displayBrightnessPost = requests.put('http://localhost:4200/api/stt/message',json=payload)
                      print(displayBrightnessPost)

                except websockets.exceptions.ConnectionClosedError as e:
                    print(e)
                    assert e.code == 4008
                    break
                except Exception as e:
                    assert False, "Not a websocket 4008 error"

        send_result, receive_result = await asyncio.gather(send(), receive())

asyncio.run(send_receive())
