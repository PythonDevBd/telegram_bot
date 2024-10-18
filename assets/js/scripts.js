document.addEventListener("DOMContentLoaded", function () {
    // Get the elements
    const pointsDisplay = document.getElementById("points");
    const claimButton = document.querySelector(".claim-button");
    const tapImage = document.getElementById('tapImage'); // Fixed tapImage selection
    const userRankDisplay = document.querySelector('.user-info p'); // Display the user rank
    const profitDisplay = document.querySelector('.profit-per-tap');
    const boostButton = document.getElementById('boostButton');

    // Initialize user data
    let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 1;
    let userRank = localStorage.getItem("userRank") || "Starter"; // Default rank is 'Starter'
    let checkInStreak = parseInt(localStorage.getItem("checkInStreak")) || 0;

    let profitPerTap = 1; // Base profit per tap
    let boostedProfit = 2; // Boosted profit value
    let boostDuration = 5000; // Boost lasts for 5 seconds
    let boostCooldown = 10000; // Cooldown for 10 seconds

    

    // Function to update points
    function updatePoints(amount) {
        points += amount;
        pointsDisplay.textContent = points;
        localStorage.setItem("points", points); // Save points to local storage
    }


    document.addEventListener('DOMContentLoaded', () => {
        const tapImage = document.getElementById('tapImage');
        const pointsDisplay = document.getElementById('points');
        let balance = 0;
    
        tapImage.addEventListener('click', () => {
            // Apply spin animation
            tapImage.style.animation = 'spin 0.6s linear';
    
            // Reset the animation after it's done to allow repeated taps
            setTimeout(() => {
                tapImage.style.animation = '';
            }, 600);
    
            // Create a floating coin element
            const floatingCoin = document.createElement('img');
            floatingCoin.src = 'assets/images/coin-icon.png'; // Use the coin image here
            floatingCoin.className = 'floating-coin';
            document.body.appendChild(floatingCoin);
    
            // Position the floating coin at the center of the tapped image
            const imageRect = tapImage.getBoundingClientRect();
            floatingCoin.style.left = `${imageRect.left + imageRect.width / 2 - 15}px`; // Center horizontally
            floatingCoin.style.top = `${imageRect.top}px`; // Align vertically
    
            // Remove the floating coin after the animation ends
            setTimeout(() => {
                floatingCoin.remove();
            }, 1000);
    
            // Update balance
            balance += 3;
            pointsDisplay.textContent = balance;
        });
    });
    
});
