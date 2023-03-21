
import bluetooth

server_socket = bluetooth.BluetoothSocket()

print(server_socket)

port = 4
host = bluetooth.read_local_bdaddr()[0]

print(host)

server_socket.bind((host, port))
server_socket.listen(1)

print("Waiting for connection on RFCOMM channel", port)

client_socket, client_info = server_socket.accept()
print("Accepted connection from", client_info)

while True:
    # if sound classification data, add sound classification data header

    # if speech to text data, add speech to text data header



    data = client_socket.recv(1024)
    if not data:
        break
    print("Received:", data)

client_socket.close()
server_socket.close()
