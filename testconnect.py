
import threading
from time import sleep
import bluetooth
import requests

def connect ():
  # bd_addr = "28:16:A8:6E:60:7F"
  # port = 4
  # sock = bluetooth.BluetoothSocket()

  print("Waiting for connection request from frontend")

  sock = reinitializeConnection()
  
  # send_thread = threading.Thread(target=send_data)
  send_thread = threading.Thread(target=sendData,args=(sock,))
  receive_thread = threading.Thread(target=receiveData,args=(sock,))
    
  send_thread.start()
  receive_thread.start()

  send_thread.join()
  receive_thread.join()
  
  sock.close()

def receiveData(sock):
  global socketClosed
  while True:
    sleep(1)

    if socketClosed:
      print('closing socket')
      break

    processStatusRequest = requests.get('http://localhost:4200/api/status/processing')

    if not processStatusRequest.ok:
      print('Error: Cannot find request')
      break
      
    isProcessing = processStatusRequest.json()["value"]

    # If processing, read values from socket
    if (not isProcessing):
      data = sock.recv(1024)

      if(data):
        decodedData: str = data.decode()
        
        value:str = decodedData[1:len(decodedData)]
        print(value.isdigit())

        if(decodedData.startswith('d')):
          
          payload = {"value": 16}
          headers = {"Content-Type": "application/json"}
          displayBrightnessPost = requests.post('http://localhost:4200/api/status/brightness',json=payload,headers=headers)

          print(displayBrightnessPost)

        print(decodedData.startswith('a'))
        print("Received: ", data.decode())

def sendData(sock):
  global socketClosed
  while True:
    sleep(1)
    disconnectStatusRequest = requests.get("http://localhost:4200/api/request/disconnect")

    if not disconnectStatusRequest.ok:
      print('Error: Cannot find request')
      break
      
    shouldDisconnect = disconnectStatusRequest.json()["value"]

    if(shouldDisconnect):
      socketClosed = True
      print('closing connection')
      sock.sendall("close".encode('utf-8'))
      sock.close()
      break
      

def reinitializeConnection():
    global socketClosed
    bd_addr = "28:16:A8:6E:60:7F"
    port = 4
    sock = bluetooth.BluetoothSocket()

    while True:
      request = requests.get('http://localhost:4200/api/request/connection')
      value = request.json()["value"]
      print("Connection Requested: ", value)
      if value == True:
        print("Got request to connect!")
        sock.connect((bd_addr, port))
        break

      sleep(1)

    print("Connected to {}",bd_addr)
    
    return sock


socketClosed = False

while True:

  connect()

  # retry = input("Retry again? Y/N: ").capitalize()

  # if(retry != "Y" and retry != "Yes"):
  #   break
  
  socketClosed = False






     # print("a. Toggle processing")
      # print("b. Toggle stt / classification")
      # print("c. Update brightness request")
      # print("d. Update bit-depth request")

      # choice = input("Please pick one:")
      # message = "hello!"
      # b = message.encode('utf-8')
      # sock.send(b)  