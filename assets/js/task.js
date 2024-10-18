
        let taskCompleted = false; // Track if the user completed the task
        let coins = 0; // Initialize balance variable

        function updateBalance(points) {
            coins += points; // Add points to balance
            document.getElementById('balance').textContent = `Current Balance: G:${coins}`; // Update balance display
        }

        function performTask() {
            // Redirect to the task link
            window.open('https://www.youtube.com/@BDMusicfest', '_blank');

            // Enable the Verify button
            const verifyButton = document.getElementById('verify-button');
            verifyButton.disabled = false;

            // Disable the Perform button
            const performButton = document.getElementById('perform-button');
            performButton.disabled = true;

            // Prompt the user to confirm completion (you can also use a different method to track this)
            taskCompleted = confirm("Did you complete the task? (You can check if you subscribed/joined)");
        }

        document.getElementById('verify-button').addEventListener('click', function() {
            const taskMessage = document.getElementById('task-message');

            if (taskCompleted) {
                // If the task is completed successfully
                taskMessage.textContent = "You have successfully completed your task. Points added to your balance.";
                taskMessage.className = ""; // Reset to default style
            } else {
                // If the task is not completed correctly
                taskMessage.textContent = "You did not complete your task correctly.";
                taskMessage.className = "error"; // Add error styling
            }

            // Show the message
            taskMessage.style.display = "block";

            // Hide the message after 3 seconds
            setTimeout(() => {
                taskMessage.style.display = "none";
                // Reset for the next task
                taskCompleted = false;
                document.getElementById('perform-button').disabled = false; // Enable Perform button again
                document.getElementById('verify-button').disabled = true; // Disable Verify button again
            }, 3000);
        });
        window.addEventListener('resize', function () {
            // Adjust elements dynamically based on screen size
            adjustTaskBoxLayout();
        });
        
        function adjustTaskBoxLayout() {
            const taskBoxes = document.querySelectorAll('.task-box');
            taskBoxes.forEach(box => {
                if (window.innerWidth < 480) {
                    box.style.flexDirection = 'column';
                } else {
                    box.style.flexDirection = 'row';
                }
            });
        }
        