  $(function() { // document ready

    $('#calendar').fullCalendar({
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
     // lazyFetching: false,
      slotDuration: '24:00:00',
      locale: 'it',
      //now: '2018-11-06',
      now: new Date(),
      editable: false, // enable draggable events
      aspectRatio: 3,
      contentHeight: 'auto',
      slotWidth: 20,
      scrollTime: '00:00', // undo y 6am scrollTime
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'timelineWeek, timelineMonth'
      },
      defaultView: 'timelineWeek',
      resourceColumns: [
      {
        labelText: 'Locale',
        field: 'title',
        width: 70,        
      }
    ], 
      resources: [
        { id: '004',piano: 'Sottopiano', title: '004' },
        { id: '007',piano: 'Sottopiano', title: '007'},
        { id: '102',piano: 'Piano terra', title: '102' },
        { id: '109',piano: 'Piano terra', title: '109' },
        { id: '110',piano: 'Piano terra', title: '110' },
        { id: '113',piano: 'Piano terra', title: '113' },
        { id: '114',piano: 'Piano terra', title: '114' },
        { id: '201',piano: 'Primo piano', title: '201' },
        { id: '202',piano: 'Primo piano', title: '202' },
        { id: '207',piano: 'Primo piano', title: '207' },
        { id: '1000',piano: 'Piano terra', title: 'Corte 0' },
        { id: '1001',piano: 'Piano terra', title: 'Corte 1' },
        { id: '1002',piano: 'Piano terra', title: 'Corte 2' },
        { id: '1003',piano: 'Sottopiano', title: 'Corte 3' }
        
      ],
      

      googleCalendarApiKey: '',
             
      eventSources: [
      {
    	  //Eventi Pubblici
        
    	googleCalendarId: '',
    	className: 'eventiPubblici',
        eventDataTransform: function( eventData ) { 
            //console.log(eventData);
            eventData.resourceIds = parseTitle(eventData.title);
            //eventData.title = eventData.description;
            //eventData.rendering = 'background';
            eventData.title = "";   
            eventData.className = "moreBorder";
            eventData.color = 'red';
            return eventData;
        }      
      
      } ,
      {
        //Eventi riservati agli iscritti
      	googleCalendarId: '',
      	className: 'eventiPubblici',
          eventDataTransform: function( eventData ) { 
              //console.log(eventData);
              eventData.resourceIds = parseTitle(eventData.title);
              //eventData.title = eventData.description;
              //eventData.rendering = 'background';
              //eventData.description = 'Evento riservato agli iscritti';
              eventData.title = ""; 
              eventData.className = "moreBorder";
              eventData.color = 'red';
              return eventData;
          }      
        
        } ,
        {
            //Eventi interni
          	googleCalendarId: '',
          	className: 'eventiPubblici',
              eventDataTransform: function( eventData ) { 
                  //console.log(eventData);
                  eventData.resourceIds = parseTitle(eventData.title);
                  //eventData.title = eventData.description;
                  //eventData.rendering = 'background';
                  eventData.description = 'Attività SA Manifattura';
                  eventData.title = "";  
                  eventData.className = "moreBorder";
                  eventData.color = 'red';
                  return eventData;
              }      
            
         }
      
      ],
      columnHeaderText: function(date) {
    	    if (date.getDay() === 5) {
    	      return 'Friday!';
    	    } else {
    	      return mom.format('LLL');
    	    }
      },
      
      eventClick: function(event) {
        // opens events in a popup window
        //window.open(event.url, 'gcalevent', 'width=700,height=600');
        return false;
      },
      eventRender: function(event, element) {  
    	  //console.log("EVENT---->");
    	  //console.log(event);
    	  var description = event.description;
    	  var descriptionWithBlank = description;
    	  //if(((description.includes("<a")) &&(!description.includes("_blank")))){
    	  if(( (description.indexOf("<a") > -1 ) &&( description.indexOf("_blank") < 0  ))){
    		  descriptionWithBlank = description.replace('<a', '<a target = "_blank" ');
    	    	//console.log(description);
    	    	//console.log(descriptionWithBlank);
    	    }
  	    element.qtip({
  	      content: descriptionWithBlank,
  	    	//content: "<a href='https://www.google.com'>" + event.description +"</a>",
  	    	hide: {
  	          fixed: true,
  	          delay: 100
  	        },
  	      position: {  			
  			at: 'center', // at the bottom right of...  			
  		 }
  	    	 
  	    });
      	//console.log(event);
      	//console.log(element);
      },
      filterResourcesWithEvents: false,
      resourceRender: function(resourceObj, labelTds, bodyTds) {        
          var resourceLabel = labelTds.find('.fc-cell-text');
          var oldLabel = resourceLabel.text();
          var imgUrl =  oldLabel + ".html";
          var newLabel = '<a href="' + imgUrl + '" target="_blank">' + oldLabel + '</a>'; 
          resourceLabel.text('');
          resourceLabel.append(newLabel);          
       }
    });
  
  });

  function parseTitle(title){
    var tokens = title.split(",");
    var locali = [];
    for(var i =0; i <tokens.length; i++){
        var token = tokens[i].trim();
       // console.log("token------------------------->");
        //console.log(token);
        var substr = token.substring(token.length-3);
        if(token.indexOf("Corte 0") > -1){
        	substr = "1000";
        }
        if(token.indexOf("Corte 1") > -1){
        	substr = "1001";
        }
        if(token.indexOf("Corte 2") > -1){
        	substr = "1002";
        }
        if(token.indexOf("Corte 3") > -1){
        	substr = "1003";
        }
        //console.log(substr);
        //console.log(substr + "--->" + isNaN(substr));
        if(!isNaN(substr)){
            locali.push(substr);
        }
    }
    return locali;
 }