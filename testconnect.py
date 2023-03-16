
import bluetooth
def connect ():
  bd_addr = "2A:16:A8:6E:61:7F"
  port = 135
  sock=bluetooth.BluetoothSocket()
  connection = sock.connect((bd_addr, port))


  print(bd_addr)
  sock.send("hello!!")
  sock.close()

connect()
