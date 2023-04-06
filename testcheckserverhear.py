import bluetooth
def connect ():
  bd_addr = "94:08:53:74:CD:20"
  port = 4
  sock = bluetooth.BluetoothSocket()
  connection = sock.connect((bd_addr, port))

  while True:

    print("Please pick one: ")
    print("a. Toggle processing")
    print("b. Toggle stt / classification")
    print("c. Update brightness request")
    print("d. Update bit-depth request")

    

    print(bd_addr)
    message = "hello!"
    b = message.encode('utf-8')
    sock.send(b)

  sock.close()

connect()
