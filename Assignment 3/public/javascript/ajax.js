$(document).ready(function() {
   
    function fetchStories() {
        $.ajax({
            url: "https://usmanlive.com/wp-json/api/stories",
            method: "GET",
            success: function(data) {
                let output = '<form id="story-form">';
                data.forEach(story => {
                    output += `
                        <div class="story" data-id="${story.id}">
                            <h3>${story.title}</h3>
                            <p>${story.content}</p>
                            <label for="update-title-${story.id}">Update Title:</label>
                            <input type="text" id="update-title-${story.id}" name="update-title-${story.id}" value="${story.title}">
                            <label for="update-content-${story.id}">Update Content:</label>
                            <textarea id="update-content-${story.id}" name="update-content-${story.id}" rows="4">${story.content}</textarea>
                            <button type="button" class="update-story" data-id="${story.id}">Update</button>
                            <button type="button" class="delete-story" data-id="${story.id}">Delete</button>
                        </div>
                    `;
                });
                output += '</form>';
                $("#api-result").html(output);

                
                $(".update-story").click(function() {
                    const storyId = $(this).data('id');
                    const updatedTitle = $(`#update-title-${storyId}`).val();
                    const updatedContent = $(`#update-content-${storyId}`).val();

                    $.ajax({
                        url: `https://usmanlive.com/wp-json/api/stories/${storyId}`,
                        method: "PUT",
                        data: JSON.stringify({
                            title: updatedTitle,
                            content: updatedContent
                        }),
                        contentType: "application/json",
                        success: function(response) {
                            alert('Story updated successfully');
                            fetchStories(); 
                        },
                        error: function(error) {
                            alert('An error occurred while updating the story.');
                        }
                    });
                });

                
                $(".delete-story").click(function() {
                    const storyId = $(this).data('id');

                    $.ajax({
                        url: `https://usmanlive.com/wp-json/api/stories/${storyId}`,
                        method: "DELETE",
                        success: function(response) {
                            alert('Story deleted successfully');
                            fetchStories(); 
                        },
                        error: function(error) {
                            alert('An error occurred while deleting the story.');
                        }
                    });
                });
            },
            error: function(error) {
                $("#api-result").html("<p>An error occurred while fetching data.</p>");
            }
        });
    }

    
    fetchStories();

    
    $("#add-story-form").submit(function(event) {
        event.preventDefault();
        const newTitle = $("#new-title").val();
        const newContent = $("#new-content").val();

        $.ajax({
            url: "https://usmanlive.com/wp-json/api/stories",
            method: "POST",
            data: JSON.stringify({
                title: newTitle,
                content: newContent
            }),
            contentType: "application/json",
            success: function(response) {
                alert('Story added successfully');
                fetchStories(); 
                $("#add-story-form")[0].reset(); 
            },
            error: function(error) {
                alert('An error occurred while adding the story.');
            }
        });
    });

    
    $("#fetch-data").click(function() {
        fetchStories();
    });
});
