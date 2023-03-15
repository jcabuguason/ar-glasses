#!/usr/bin/env python3
"""PyBluez simple example rfcomm-server.py
Simple demonstration of a server application that uses RFCOMM sockets.
Author: Albert Huang <albert@csail.mit.edu>
$Id: rfcomm-server.py 518 2007-08-10 07:20:07Z albert $
"""

import socket
import bluetooth

server_sock = bluetooth.BluetoothSocket()
server_sock.bind(("94:08:53:74:cd:20", bluetooth.PORT_ANY))
server_sock.listen(1)

port = server_sock.getsockname()[1]

print(port)
uuid = "94f39d29-7d6d-437d-973b-fba39e49d4ee"

# bluetooth.advertise_service(server_sock, "SampleServer", service_id=uuid,
#                             service_classes=[uuid, bluetooth.SERIAL_PORT_CLASS],
#                             profiles=[bluetooth.SERIAL_PORT_PROFILE],
#                             protocols=[bluetooth.OBEX_UUID]
#                             )

print("Waiting for connection on RFCOMM channel", port)

client_sock, client_info = server_sock.accept()
print("Accepted connection from", client_info)

try:
    while True:
        data = client_sock.recv(1024)
        if not data:
            break
        print("Received", data)
except OSError:
    pass

print("Disconnected.")

client_sock.close()
server_sock.close()
print("All done.")