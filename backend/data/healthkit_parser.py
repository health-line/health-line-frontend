import json
json_data=open("zyan_stanley_healthkit-export_2017-01-24_2017-02-28_1491837080.84167.json").read()

data = json.loads(json_data)

for key in data:
	if len(data[key])>0:
		print(key + str(len(data[key])))
