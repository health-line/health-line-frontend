import json, io, random
#json_data=open("zyan_stanley_healthkit-export_2017-01-24_2017-02-28_1491837080.84167.json").read()

data = {}
data["blood-sugar"] = []
data["heart-rate-max"] = []
data["heart-rate-avg"] = []
data["steps"] = []
data["screen-time"] = []
data["cigarettes-smoked"] = []
data["water-drunk"] = []
data["beer-drunk"] = []

for year in range(2007,2027):
	for month in range(1,12):
		for day in range(1,30):
			blood_sugar_json_obj = {"value": str(random.randint(5,6)), "date": str(year) + '-' + str(month) + '-' + str(day)}
			if (year == 2009 and month == 6) or year > 2011: #this guy gets diabetes in 2009
				blood_sugar_json_obj = {"value": str(random.randint(7,8)), "date": str(year) + '-' + str(month) + '-' + str(day)}
			data["blood-sugar"].append(blood_sugar_json_obj)

			heart_rate_avg_json_obj = {"value": str(random.randint(80,90)), "date": str(year) + '-' + str(month) + '-' + str(day)}
			heart_rate_max_json_obj = {"value": str(random.randint(110,180)), "date": str(year) + '-' + str(month) + '-' + str(day)}

			if year == 2011 and month >= 10:
				heart_rate_avg_json_obj = {"value": str(random.randint(90,100)), "date": str(year) + '-' + str(month) + '-' + str(day)}
				heart_rate_max_json_obj = {"value": str(random.randint(100,140)), "date": str(year) + '-' + str(month) + '-' + str(day)}

			data["heart-rate-avg"].append(heart_rate_avg_json_obj)


			screen_time_json_obj = {"value": str(random.randint(0,100)), "date": str(year) + '-' + str(month) + '-' + str(day)}
			if year > 2013:
				screen_time_json_obj = {"value": str(random.randint(0,180)), "date": str(year) + '-' + str(month) + '-' + str(day)}
			if year > 2016 and month >= 4:
				screen_time_json_obj = {"value": str(random.randint(0,120)), "date": str(year) + '-' + str(month) + '-' + str(day)}
			if year > 2017 and month >= 2:
				screen_time_json_obj = {"value": str(random.randint(0,90)), "date": str(year) + '-' + str(month) + '-' + str(day)}
			if year > 2017 and month >= 8:
				screen_time_json_obj = {"value": str(random.randint(0,60)), "date": str(year) + '-' + str(month) + '-' + str(day)}



with open("mocked_data.json", "w") as out:
	json.dump(data, out)
