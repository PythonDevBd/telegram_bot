document.addEventListener("DOMContentLoaded", function () {
    // Get the elements
    const pointsDisplay = document.getElementById("balances"); // Points display (balance)
    const claimButton = document.getElementById("claim-button");
    const tapImage = document.getElementById('tapImage');
    const coinIcon = document.querySelector('.coin-icon'); // The coin icon image for balance
    const userRankDisplay = document.querySelector('.username'); // User rank display
    const profitDisplay = document.querySelector('.profit span'); // Correct reference to profit display
    const boostButton = document.getElementById('boostButton');

    // Simulated retrieval of the Telegram username
    let telegramUsername = "YourTelegramUsername"; // Replace with actual retrieval logic

    // Initialize user data
    let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 1;
    let userRank = localStorage.getItem("userRank") || "Starter"; // Default rank is 'Starter'
    let checkInStreak = parseInt(localStorage.getItem("checkInStreak")) || 0;

    let profitPerTap = 1; // Set base profit per tap to 1
    let boostedProfit = 6; // Boosted profit value
    let boostDuration = 5000; // Boost lasts for 5 seconds
    let boostCooldown = 10000; // Cooldown for 10 seconds

    // Display the current rank, points, and Telegram username
    pointsDisplay.textContent = points;
    userRankDisplay.textContent = ${telegramUsername} (CEO); // Use Telegram username
    profitDisplay.textContent = +${profitPerTap}; // Show correct profit per tap

    // Function to update points
    function updatePoints(amount) {
        points += amount;
        pointsDisplay.textContent = points;
        localStorage.setItem("points", points); // Save points to local storage
    }

    // Tap to earn logic with spin animation and floating image
    tapImage.addEventListener("click", function (event) {
        updatePoints(profitPerTap); // Increase points by profitPerTap per tap
        
        // Add spin animation to the tap image
        tapImage.classList.add('spin-animation'); 
        
        // Remove the spin animation after 0.6 seconds to allow for future spins
        setTimeout(() => {
            tapImage.classList.remove('spin-animation');
        }, 600);

        // Show floating image (replacing floating points)
        showFloatingCoin(event);
    });

    // Function to display a floating image (coin) that starts from the center of tapImage and moves towards the coin icon in balance
    function showFloatingCoin(event) {
        const floatingCoin = document.createElement('img');
        floatingCoin.src = 'assets/images/coin.png'; // Path to the floating coin image
        floatingCoin.className = 'floating-coin';
        document.body.appendChild(floatingCoin);

        // Get the position of the tapImage and set the starting point of the floating image to the center of the tapImage
        const tapRect = tapImage.getBoundingClientRect();
        const tapX = tapRect.left + tapRect.width / 2 - 15; // Adjust to center
        const tapY = tapRect.top + tapRect.height / 2 - 15; // Adjust to center

        floatingCoin.style.left = ${tapX}px;
        floatingCoin.style.top = ${tapY}px;
        floatingCoin.style.opacity = 1;

        // Animate the floating image towards the coin icon in balance
        animateCoinFlow(floatingCoin, tapX, tapY);
    }

    // Function to animate the floating coin image to the coin icon in the balance
    function animateCoinFlow(floatingCoin, startX, startY) {
        const coinRect = coinIcon.getBoundingClientRect();
        const targetX = coinRect.left + coinRect.width / 2 - 15; // Move to center of the coin icon
        const targetY = coinRect.top + coinRect.height / 2 - 15;

        const duration = 1000; // 1 second for animation
        const startTime = performance.now();

        function draw() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            const currentX = startX + (targetX - startX) * progress;
            const currentY = startY + (targetY - startY) * progress;

            floatingCoin.style.left = ${currentX}px;
            floatingCoin.style.top = ${currentY}px;
            floatingCoin.style.opacity = 1 - progress;

            if (progress < 1) {
                requestAnimationFrame(draw);
            } else {
                document.body.removeChild(floatingCoin); // Remove the floating coin after animation ends
            }
        }

        draw();
    }



    // Function to animate the floating coin from the claim button to the balance
    function showClaimFloatingCoin() {
        const floatingCoin = document.createElement('img');
        floatingCoin.src = 'assets/images/coin.png'; // Path to the floating coin image
        floatingCoin.className = 'floating-coin';
        document.body.appendChild(floatingCoin);

        const claimRect = claimButton.getBoundingClientRect();
        const claimX = claimRect.left + claimRect.width / 2 - 15; // Center of the claim button
        const claimY = claimRect.top + claimRect.height / 2 - 15;

        floatingCoin.style.left = ${claimX}px;
        floatingCoin.style.top = ${claimY}px;
        floatingCoin.style.opacity = 1;

        const coinRect = coinIcon.getBoundingClientRect();
        const targetX = coinRect.left + coinRect.width / 2 - 15; // Move to center of the coin icon
        const targetY = coinRect.top + coinRect.height / 2 - 15;

        const duration = 1000; // 1 second for animation
        const startTime = performance.now();

        function draw() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            const currentX = claimX + (targetX - claimX) * progress;
            const currentY = claimY + (targetY - claimY) * progress;

            floatingCoin.style.left = ${currentX}px;
            floatingCoin.style.top = ${currentY}px;
            floatingCoin.style.opacity = 1 - progress;

            if (progress < 1) {
                requestAnimationFrame(draw);
            } else {
                document.body.removeChild(floatingCoin); // Remove the floating coin after animation ends
            }
        }

        draw();
    }

   

    // Function to promote user based on streak
    function promoteUser() {
        if (userRank === "Starter" && checkInStreak >= 10) {
            userRank = "Silver";
        } else if (userRank === "Silver" && checkInStreak >= 20) {
            userRank = "Gold";
        }
        localStorage.setItem("userRank", userRank);
        userRankDisplay.textContent = ${telegramUsername} (CEO); // Update rank display
    }

    // Boost button logic
    boostButton.addEventListener('click', () => {
        if (boostButton.disabled) return;

        profitPerTap = boostedProfit;
        profitDisplay.textContent = +${profitPerTap}; // Show the boosted profit
        boostButton.disabled = true;

        setTimeout(() => {
            profitPerTap =1; // Reset to base profit
            profitDisplay.textContent = +${profitPerTap}; // Show the base profit again
            startCooldown();
        }, boostDuration);
    });

    // Cooldown logic
    function startCooldown() {
        let cooldownTime = boostCooldown / 1000;
        boostButton.textContent = Cooldown (${cooldownTime}s);

        const countdown = setInterval(() => {
            cooldownTime--;
            boostButton.textContent = Cooldown (${cooldownTime}s);

            if (cooldownTime <= 0) {
                clearInterval(countdown);
                boostButton.disabled = false;
                boostButton.textContent = 'Boost';
            }
        }, 1000);
    }
});
//Firming code here

document.addEventListener("DOMContentLoaded", () => {
    const farmButton = document.getElementById("farm-button");
    const farmingInfo = document.getElementById("farming-info");
    const timerElement = document.getElementById("timer");
    const farmingValueElement = document.getElementById("farming-value");
    const claimButton = document.getElementById("claim-button");
    const balanceElement = document.getElementById("balances");

    let farmingInterval;
    let farmingValue = 0.000; // Initial farming value
    let balance = parseInt(balanceElement.textContent, 10); // Initial balance from the HTML

    farmButton.addEventListener("click", startFarming);

    function startFarming() {
        // Hide the farm button and show the farming info
        farmButton.style.display = "none";
        farmingInfo.style.display = "flex";

        // Set initial time (8 hours, 0 minutes, 0 seconds)
        let hours = 7;
        let minutes = 59;
        let seconds = 59; // Set to 10 seconds for testing

        // Update the timer and farming value immediately when farming starts
        updateTimer();
        updateFarmingValue();

        // Start the interval to update the timer and farming value every second
        farmingInterval = setInterval(() => {
            // Increment the farming value every second
            farmingValue += 0.001;
            farmingValueElement.textContent = ฿ ${farmingValue.toFixed(3)};

            // Update the timer
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(farmingInterval);
                        showClaimButton();
                        return; // Stop further execution when farming is complete
                    } else {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    }
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            updateTimer();
        }, 1000); // Update every second (1000 milliseconds)

        function updateTimer() {
            timerElement.textContent = ${hours}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s;
        }

        function updateFarmingValue() {
            farmingValueElement.textContent = ฿ ${farmingValue.toFixed(3)};
        }
    }

    function showClaimButton() {
        // Hide farming info and show the claim button
        farmingInfo.style.display = "none";
        claimButton.style.display = "block";
    }

    // Event listener for the claim button
    claimButton.addEventListener("click", () => {
        // Add the farming value to balance as an integer
        const pointsToAdd = Math.floor(farmingValue * 1000); // Convert farming value to an integer point system
        balance += pointsToAdd;
        balanceElement.textContent = balance;

        // Hide the claim button and reset farming state
        claimButton.style.display = "none";
        resetFarming();
    });

    function resetFarming() {
        // Reset farming value and timer
        farmingValue = 0.000;
        farmingValueElement.textContent = ฿ ${farmingValue.toFixed(3)};
        timerElement.textContent = 08h 00m 00s;

        // Show the farming button again
        farmButton.style.display = "block";
        farmButton.textContent = "Farming Now";
    }
});
