import socket
sock = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
print(sock)
print('hello')
sock.connect(("127.0.0.1", 65432))

