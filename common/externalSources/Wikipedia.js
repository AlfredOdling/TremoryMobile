Wikipedia = (function(){


	function thumbnail(img,place){

        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=query&titles='+ place +'&prop=pageimages&format=json&pithumbsize=150&callback=?',
            dataType: 'json',
            success: function(data) {

                var obj = data.query.pages;
                if(obj[Object.keys(obj)[0]].thumbnail) {
                    img.attr('src', obj[Object.keys(obj)[0]].thumbnail.source);
                }
            }
        });
	}

	function page(selector, place) {
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=' + place,
            dataType: 'jsonp',
            success: function(data) {

                var obj = data.query.pages;
                selector.html(obj[Object.keys(obj)[0]].extract);
            }
        });

    }

	return {
		thumbnail: thumbnail,
        page: page
	}

})();