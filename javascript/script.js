
        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-links li');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
        
        // Audio Player Functionality
        const playPauseBtn = document.querySelector('.play-pause');
        const progressBar = document.querySelector('.progress');
        const currentTimeEl = document.querySelector('.current-time');
        const durationEl = document.querySelector('.duration');
        
        let isPlaying = false;
        
        // Mock audio functionality
        playPauseBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playPauseBtn.innerHTML = isPlaying ? 
                '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
            
            if (isPlaying) {
                simulatePlayback();
            }
        });
        
        function simulatePlayback() {
            let progress = 0;
            const duration = 225; // 3:45 in seconds
            
            if (isPlaying) {
                const interval = setInterval(() => {
                    if (!isPlaying) {
                        clearInterval(interval);
                        return;
                    }
                    
                    progress += 1;
                    const percent = (progress / duration) * 100;
                    progressBar.style.width = `${percent}%`;
                    
                    // Update time display
                    currentTimeEl.textContent = formatTime(progress);
                    durationEl.textContent = formatTime(duration);
                    
                    if (progress >= duration) {
                        isPlaying = false;
                        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                        clearInterval(interval);
                    }
                }, 1000);
            }
        }
        
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
        // Progress bar click to seek
        const progressContainer = document.querySelector('.progress-bar');
        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = 225;
            const seekTime = (clickX / width) * duration;
            
            progressBar.style.width = `${(clickX / width) * 100}%`;
            currentTimeEl.textContent = formatTime(seekTime);
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });