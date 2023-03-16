import lightblue

uuid = "00001101-0000-1000-8000-00805F9B34FB"
server_sock = lightblue.socket()
server_sock.bind(("", lightblue.PSM_SDP))
lightblue.advertise_service(server_sock, "MyService", uuid, service_classes=[uuid])
server_sock.listen(1)

client_sock, address = server_sock.accept()
