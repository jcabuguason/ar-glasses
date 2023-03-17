
import bluetooth
def connect ():
  bd_addr = "94:08:53:74:CD:20"
  port = 4
  sock=bluetooth.BluetoothSocket()
  connection = sock.connect((bd_addr, port))


  print(bd_addr)
  message = "hello!"
  b = message.encode('utf-8')
  sock.send(b)
  sock.close()

connect()
