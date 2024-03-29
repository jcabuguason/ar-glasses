# # simple inquiry example
# import bluetooth

# nearby_devices = bluetooth.discover_devices(lookup_names=True)
# print("Found {} devices.".format(len(nearby_devices)))

# for addr, name in nearby_devices:
#     print("  {} - {}".format(addr, name))


import bluetooth
print("looking for nearby devices...")
nearby_devices = bluetooth.discover_devices(lookup_names = True, flush_cache = True, duration = 20)
print("found %d devices" % len(nearby_devices))
for addr, name in nearby_devices:
    print(" %s - %s" % (addr, name))
    for services in bluetooth.find_service(address = addr):
        print(" Name: %s" % (services["name"]))
        print(" Description: %s" % (services["description"]))
        print(" Protocol: %s" % (services["protocol"]))
        print(" Provider: %s" % (services["provider"]))
        print(" Port: %s" % (services["port"]))
        print(" Service id: %s" % (services["service-id"]))
