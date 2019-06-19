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
        width: 60,
        
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
        { id: '207',piano: 'Primo piano', title: '207' }
      ],
      

      googleCalendarApiKey: '',
             
      eventSources: [
      {
    	  //Eventi Pubblici
        
    	googleCalendarId: '',
    	className: 'eventiPubblici',
        eventDataTransform: function( eventData ) { 
            console.log(eventData);
            eventData.resourceIds = parseTitle(eventData.title);
            //eventData.title = eventData.description;
            //eventData.rendering = 'background';
            eventData.title = "";            
            eventData.color = 'red';
            return eventData;
        }      
      
      } ,
      {
        //Eventi riservati agli iscritti
      	googleCalendarId: '',
      	className: 'eventiPubblici',
          eventDataTransform: function( eventData ) { 
              console.log(eventData);
              eventData.resourceIds = parseTitle(eventData.title);
              //eventData.title = eventData.description;
              //eventData.rendering = 'background';
              eventData.description = 'Evento riservato agli iscritti';
              eventData.title = "";            
              eventData.color = 'red';
              return eventData;
          }      
        
        } ,
        {
            //Eventi interni
          	googleCalendarId: '',
          	className: 'eventiPubblici',
              eventDataTransform: function( eventData ) { 
                  console.log(eventData);
                  eventData.resourceIds = parseTitle(eventData.title);
                  //eventData.title = eventData.description;
                  //eventData.rendering = 'background';
                  eventData.description = 'Spazio Occupato per attività interna';
                  eventData.title = "";            
                  eventData.color = 'red';
                  return eventData;
              }      
            
         }
      
      ],
      
      eventClick: function(event) {
        // opens events in a popup window
        //window.open(event.url, 'gcalevent', 'width=700,height=600');
        return false;
      },
      eventRender: function(event, element) {      	
  	    element.qtip({
  	      content: event.description,
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
          var imgUrl =  imgUrl= oldLabel + ".html";
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
        //console.log(token);
        var substr = token.substring(token.length-3);
        //console.log(substr + "--->" + isNaN(substr));
        if(!isNaN(substr)){
            locali.push(substr);
        }
    }
    return locali;
 }