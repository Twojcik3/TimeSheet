# TimeSheet

servers:
url: 'http://localhost:3000/api'

Paths:

    '/user/:id/:description/:startTime/startNewTime;
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
    	Reponses:
    		‘200’:
    		Desciption: OK

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
    	Reponses:
    		‘200’:
    		Desciption: OK


    'statistics/:userId?/getStatistics'
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
    		content:
    			application/json:
    				schema:
    					type: object
    					properties:
    						name:
    							type: string
    						surname:
    							type: string
    						day:
    							type: string
    						description:
    							type: string
    						userId:
    							type: string
    						loggedTime:
    							type: number
