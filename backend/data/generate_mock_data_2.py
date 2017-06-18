import json, io, random
#json_data=open("zyan_stanley_healthkit-export_2017-01-24_2017-02-28_1491837080.84167.json").read()

#data = {"id": 1}
#data["dates"] = []
data = []
"""data["heart-rate-max"] = []
data["heart-rate-avg"] = []
data["steps"] = []
data["screen-time"] = []
data["cigarettes-smoked"] = []
data["water-drunk"] = []
data["beer-drunk"] = []
"""
screen_time_max = 110
month_count = 0
blood_sugar_rand = 0
heart_rate_rand = 0

for year in range(2013,2040):
	for month in range(1,12):
	
		json_obj = {"date": str(year) + '-' + str(month) + '-1'}

		blood_sugar_val = random.randint(5,6)
		if (year == 2015 and month == 6) or year > 2015: #this guy gets diabetes in 2009
			blood_sugar_val = random.randint(7,8)
		
		heart_rate_avg_val = random.randint(75 + blood_sugar_rand,80 + blood_sugar_rand)
		heart_rate_max_val = random.randint(110 + blood_sugar_rand,180 + blood_sugar_rand)
		if month_count % 7 == 0:
			blood_sugar_rand = random.randint(-5,5)
		if year == 2011 and month >= 10:
			heart_rate_avg_val = random.randint(80,90)
			heart_rate_max_val = random.randint(100,140)

		screen_time_val = random.randint(0,100)
		if year > 2016:
			if month_count % 3 == 0 and screen_time_max < 180:
				screen_time_max += 2
			screen_time_val = random.randint(0,screen_time_max)
		if year > 2017 and month >= 4:
			if month_count % 5 == 0 and screen_time_max > 120:
				screen_time_max -= 3
			screen_time_val = random.randint(0,screen_time_max)

		if year > 2018 and month >= 2:
			if month_count % 4 == 0 and screen_time_max > 90:
				screen_time_max -= 2
			screen_time_val = random.randint(0,screen_time_max)
		if year > 2018 and month >= 8:
			if month_count % 3 == 0 and screen_time_max > 60:
				screen_time_max -= 2
			screen_time_val = random.randint(0,screen_time_max)

		steps_val = random.randint(500,11000)

		if month < 4 or month > 8:
			steps_val = random.randint(500,8000)

		if year == 2016 and month > 8 and month < 11:
			steps_val = random.randint(200,1000)


		weight_val = 80
		calories_val = 2600

		if year == 2017 and month > 8:
			if month_count % 4 == 0:
				weight_val += 1
				calories_val += 30

		if year == 2023 and month > 8:
			if month_count % 3 == 0:
				weight_val += 1
				calories_val += 20

		if year == 2035 and month > 8:
			if month_count % 1 == 0:
				weight_val += 1
				calories_val += 30






		json_obj["heart-rate-avg"] = heart_rate_avg_val
		json_obj["heart-rate-max"] = heart_rate_max_val
		json_obj["FAT_BURN_MIN"] = heart_rate_avg_val + 20
		json_obj["FAT_BURN_MAX"] = heart_rate_avg_val + 50
		json_obj["CARDIO_MIN"] = heart_rate_avg_val + 50
		json_obj["CARDIO_MAX"] = heart_rate_avg_val + 80
		json_obj["PEAK_MIN"] = heart_rate_avg_val + 80
		json_obj["PEAK_MAX"] = 220
		
		json_obj["BLOOD_SUGAR"] = blood_sugar_val
		json_obj["SCREEN_TIME"] = screen_time_val
		json_obj["STEPS"] = steps_val
		json_obj["WEIGHT"] = weight_val
		data.append(json_obj)
		month_count += 1

with open("mocked_data.json", "w") as out:
	json.dump(data, out)
