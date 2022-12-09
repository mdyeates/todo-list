$(document).ready(function () {
  $("#btn").click(function () {
    var task = $("#todo-input").val();
    var toDoListEl = $("#todo-list");
    var toDoCount = $("li").length + 1;
    // var todos = [];

    if (task === "") {
      alert("You cannot enter a blank task");
    } else {
      var todo = {
        task: $("li"),
      };

      // todos.push(todo);
      // localStorage.setItem("todo", JSON.stringify(todo));

      $(toDoListEl).prepend("<li class='item'>" + task + " <button class='completed'>Completed</button>" + "</li>");
      $("#todo-input").val("");
      $(".item:first-child").hide().fadeIn("slow");
      $("#todo-count").text(toDoCount);

      $(".completed").click(function () {
        $(this)
          .closest("li")
          .fadeOut("slow", function () {
            $(this).closest("li").remove();
          });
        $("#todo-count").text((toDoCount -= 1));
        // localStorage.removeItem("todo");
      });
    }
  });

  $("#todo-input").keypress("keydown", function (event) {
    var enterKey = 13;
    if (event.keyCode === enterKey) {
      $("#btn").click();
    }
  });
  $("ul").sortable();
});
