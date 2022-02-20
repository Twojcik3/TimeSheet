# TimeSheet

servers:
  - url: 'http://localhost:3000/api

Paths:
	‘/user/:id/:description/:startTime/startNewTime’
	POST:
		Parameters:
			-schema
				Type: string
			Name: id
			In: path
			Required: true
			
			-schema
				Type: string
			Name: description
			In: path
			Required: true

			-schema
				Type: date
			Name: startTime
			In: path
			Required: true

	‘/user/:userId/:activityId/:endTime/setEndTime’
	PATCH:
		Parameters:
			-schema
				Type: string
			Name: userId
			In: path
			Required: true

			-schema
				Type: string
			Name: activityId
			In: path
			Required: true
			
			-schema
				Type: date
			Name: endTime
			In: path
			Required: true



	‘statistics/:userId?/getStatistics’
	Get:
		Parameters:
		-in: query
		Name: userId
		Schema:
			Type: string
		Required: false
		Reponses:
			‘200’:
			Desciption: OK
