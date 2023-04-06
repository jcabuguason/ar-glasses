
import threading
import time
import bluetooth

socketClosed = False

def sendData(sock):
  global socketClosed
  while True:
    if(socketClosed):
        print('closing socket')
        break
    response = input("Send values to the client: ")
    print(sock.sendall(response.encode('utf-8')))

    time.sleep(1)

def receiveData(sock):
  global socketClosed
  while True:
    if(socketClosed):
        print('closing socket')
        break

    if (sock.recv(1024).decode() == "close"):
        print("closing connection")
        socketClosed = True
        sock.close()
        break


    time.sleep(1)

while True:

  server_socket = bluetooth.BluetoothSocket()

  print(server_socket)
  port = 4
  host = bluetooth.read_local_bdaddr()[0]

  print(host)

  server_socket.bind((host, port))

  server_socket.listen()

  print("Waiting for connection on RFCOMM channel", port)

  client_socket, client_info = server_socket.accept()
  print("Accepted connection from", client_info)

  send_thread = threading.Thread(target=sendData,args=(client_socket,))
  receive_thread = threading.Thread(target=receiveData,args=(client_socket,))

  send_thread.start()
  receive_thread.start()
  send_thread.join()
  receive_thread.join()

  # retry = input("Try again? Y/N")

  # if retry != "Y":
  #   break
  socketClosed = False


server_socket.close()
