$(function(){
  	
  	// ids
  	var cForm = $('#cForm');
    var navLinks = $('#nav a');
    var contact = $('#contact');
    var contactLink = $('#contactLink');
    var logo = $('#logo');
    var name = $('#name');
    var email = $('#email');
    var ta = $('#ta');
    
    // classes
    var about = $('.aboutLink');
    var tools = $('.toolsLink');
    var skills = $('.skillsLink');
    var top = $('.top');
    var contentBox = $('.contentBox');
    var contentBoxLast = $('.contentBoxLast');
    var fb = $('.fb');
    var swf = $("#swf1");
    
    //booleans
    var open = false;
    
    
    //click functions for page nav	
	about.click(function(e) {
	     $('html, body').animate({
	         scrollTop: $("#aboutMe").offset().top
	         
	     }, 1500);
	     e.preventDefault();
 	});
   	
   	tools.click(function(e) {
	     $('html, body').animate({
	         scrollTop: $("#tools").offset().top
	         
	     }, 1500);
	     e.preventDefault();
 	});
 	
 	skills.click(function(e) {
	     $('html, body').animate({
	         scrollTop: $("#skills").offset().top
	        
	         
	     }, 1500);
	      e.preventDefault();
 	}); 
    
    top.click(function(e) {
	     $('html, body').animate({
	         scrollTop: $("body").offset().top
	         
	     }, 1500);
	     e.preventDefault();
 	});
 	
 	
 	//scroll function to display and hide sub nav
 	
 	$(window).scroll(function(){
 		
 		
 		var y = $(window).scrollTop();
		
		console.log(y);
		
		if( y > (500) ){
            
            $("#subNav").fadeIn('slow');
        }
        
        if( y < (500) ){
            
            $("#subNav").fadeOut('slow');
        }
		
    });
    
    
    // fancy box for weather swf
    
    swf.fancybox({
		'padding'			: 0,
		'autoScale'			: true,
		'overlayColor'		: '#000',
		'width'             : 800,
		'height'            : 500,
		'overlayOpacity'	: 0.7,
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic'
	});
    
    //fancy box for images
    
    fb.fancybox({
		'titlePosition'	: 'inside',
		'overlayColor'		: '#000',
		'overlayOpacity'	: 0.7,
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic'
	});
    
    // hover elements on images
    
    contentBox.bind('mouseenter' , function(e){
    	
    	
    	$(this).children('.info').css({display: 'block', opacity: '1'}).hide().fadeIn(400);
    	e.stopPropagation();
    	e.preventDefault();
    	
    });
    
    
    contentBox.bind('mouseleave' , function(e){
    	
    	$(this).children('.info').fadeOut(400, function(){
    		
    		$(this).children('.info').css({display: 'none'})
    		
    	});		
    	e.stopPropagation();
    	e.preventDefault();
  		
    	
    });
    
    
    contentBoxLast.bind('mouseenter' , function(e){
    	
		$(this).children('.info').css({display: 'block'}).hide().fadeIn(400);
    	e.stopPropagation();
    	e.preventDefault();
    	
    });
    
    contentBoxLast.bind('mouseleave' , function(e){
    	
    	$(this).children('.info').fadeOut(400, function(){
    		
    		$(this).children('.info').css({display: 'none'})
    		
    	});
   		e.stopPropagation();
    	e.preventDefault();
    	
    });
   	 
    
	// remove and add text to contact form text fields
    
    name.bind('focus' , function(e){
    	
   		if(name.val() == "Your Name"){
   			name.val("");	
   		}
    		
    });
    name.bind('focusout' , function(e){
    	
   		if(name.val() === ""){
   			name.val("Your Name");
   		}
    		
    });
    
    email.bind('focus' , function(e){
    	
    	if(email.val() == "Your Email"){
   			email.val("");	
   		}
    		
    });
    email.bind('focusout' , function(e){
    	
    	if(email.val() === ""){
   			email.val("Your Email");
   		}
    		
    });
    
    ta.bind('focus' , function(e){
    		
   		if(ta.val() == "Your Message"){
   			ta.val("");	
   		}
    		
    		
    });
    ta.bind('focusout' , function(e){
    	
    	if(ta.val() === ""){
    		ta.val("Your Message");
   		}
    			
    });
    
    
   	// function that opens and closes the contact form 
    
    
    function openCLose(){
		if(open === false){
            
            contactLink.addClass('activeTab').css({minHeight: 37});
            logo.removeClass('activeHome').css({height: 80});
            contact.css({display: 'block'}).hide().animate({
			   
			    height: 'toggle'
			    
			}, 1000, function() {
			  	
			    
			});
            open = true;
        }else{
            contactLink.removeClass('activeTab').css({minHeight: 35});
            logo.addClass('activeHome').css({height: 82});
            contact.animate({
			   
			   	height: 'toggle'
			    
			}, 1000, function() {
			  
			   contact.css({display: 'none'});
			    
			});
            open = false;
            
        }
    	
    }
    
    
    //click function to open and close the contact box of the contact nav is clicked
    
    
    contactLink.bind('click' , function(e){
    		
		e.stopPropagation();
		e.preventDefault();
		openCLose();
 	   		
    });
    
    //click function to open and close the contact box if the escape hatch is clicked.    

    logo.bind('click' , function(e){
		e.stopPropagation();
		e.preventDefault();
		if (open === true) {
			openCLose();	
		}else{
			window.location.reload();
		}
    		
    });
    
    // function to ajax the form data to the contact.php on the server.
    
    var formResults = function(formData){
    	
    	$.ajax({
    		
    		url: 'xhr/contact.php',
    		type: 'get',
    		dataType: 'json',
    		data: formData,
    		success: function(res){
    		
    			if(res.sent){
    			    			
    				$('#message').css({display: 'block'}).hide().fadeIn(1500).animate({
                       opacity: '0'
                    }, 3000, function(){
                        $('#message').hide(600);
                    });
    				
    				openCLose();
    				
    			}
    		}	
    	});
    }
    
    // gathers the form data and gives it to the formResults() - return false to stop default
    
    cForm.submit(function(e){
    	   		
    	var formData = $(this).serialize();
    	
    	formResults(formData);	
    	
    	return false;	
    });    
});