
import bluetooth
def connect ():
  bd_addr = "94:08:53:74:CD:20"
  port = 5
  sock=bluetooth.BluetoothSocket()
  connection = sock.connect((bd_addr, port))

  
  print(bd_addr)
  sock.send("hello!!")
  sock.close()

connect()
