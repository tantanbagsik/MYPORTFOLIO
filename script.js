// Educational Platform JavaScript

// Utility: Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global Variables
let currentUser = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let quizAnswers = [];
let userProgress = {
    coursesEnrolled: 0,
    quizScores: 0,
    studyTime: 0,
    certificates: 0,
    progress: []
};

// Course Data
const courses = [
    {
        id: 1,
        title: "Introduction to JavaScript",
        description: "Learn the fundamentals of JavaScript programming, from variables to functions and beyond.",
        category: "programming",
        level: "Beginner",
        duration: "6 weeks",
        icon: "fab fa-js"
    },
    {
        id: 2,
        title: "UI/UX Design Principles",
        description: "Master the art of user interface and user experience design with modern tools and techniques.",
        category: "design",
        level: "Intermediate",
        duration: "8 weeks",
        icon: "fas fa-palette"
    },
    {
        id: 3,
        title: "Digital Marketing Strategy",
        description: "Build effective digital marketing campaigns and grow your online presence.",
        category: "business",
        level: "Beginner",
        duration: "4 weeks",
        icon: "fas fa-chart-line"
    },
    {
        id: 4,
        title: "Data Science Fundamentals",
        description: "Explore the world of data science with Python and machine learning basics.",
        category: "science",
        level: "Advanced",
        duration: "12 weeks",
        icon: "fas fa-database"
    },
    {
        id: 5,
        title: "Python for Beginners",
        description: "Start your programming journey with Python, one of the most versatile languages.",
        category: "programming",
        level: "Beginner",
        duration: "6 weeks",
        icon: "fab fa-python"
    },
    {
        id: 6,
        title: "Graphic Design Mastery",
        description: "Learn professional graphic design techniques using industry-standard software.",
        category: "design",
        level: "Intermediate",
        duration: "10 weeks",
        icon: "fas fa-pencil-ruler"
    },
    {
        id: 7,
        title: "Business Analytics",
        description: "Use data to make informed business decisions and drive growth.",
        category: "business",
        level: "Advanced",
        duration: "8 weeks",
        icon: "fas fa-analytics"
    },
    {
        id: 8,
        title: "Environmental Science",
        description: "Understand the science behind climate change and environmental conservation.",
        category: "science",
        level: "Intermediate",
        duration: "6 weeks",
        icon: "fas fa-leaf"
    }
];

// Quiz Questions
const quizQuestions = {
    mathematics: [
        {
            question: "What is 15 × 8?",
            options: ["120", "110", "115", "125"],
            correct: 0
        },
        {
            question: "What is the square root of 144?",
            options: ["10", "11", "12", "13"],
            correct: 2
        },
        {
            question: "What is 25% of 80?",
            options: ["15", "20", "25", "30"],
            correct: 1
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correct: 2
        },
        {
            question: "What planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1
        },
        {
            question: "What is the speed of light?",
            options: ["299,792 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
            correct: 0
        }
    ],
    history: [
        {
            question: "In which year did World War II end?",
            options: ["1943", "1944", "1945", "1946"],
            correct: 2
        },
        {
            question: "Who was the first President of the United States?",
            options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
            correct: 1
        },
        {
            question: "Which ancient wonder of the world still stands today?",
            options: ["Colossus of Rhodes", "Hanging Gardens", "Great Pyramid of Giza", "Lighthouse of Alexandria"],
            correct: 2
        }
    ],
    geography: [
        {
            question: "What is the capital of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
            correct: 2
        },
        {
            question: "Which is the longest river in the world?",
            options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
            correct: 1
        },
        {
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            correct: 2
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check for browser compatibility
    if (!window.localStorage) {
        showNotification('Your browser does not support local storage. Some features may not work.', 'warning');
    }
    
    initializeApp();
});

function initializeApp() {
    loadCourses();
    setupEventListeners();
    loadUserProgress();
    updateDashboard();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Update ARIA attribute
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Load courses
function loadCourses(category = 'all') {
    const coursesGrid = document.getElementById('coursesGrid');
    const filteredCourses = category === 'all' 
        ? courses 
        : courses.filter(course => course.category === category);

    coursesGrid.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });

    // Add fade-in animation
    coursesGrid.querySelectorAll('.course-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}

// Create course card element
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <div class="course-image">
            <i class="${course.icon}"></i>
        </div>
        <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <span class="course-level">${course.level}</span>
                <span class="course-duration">
                    <i class="fas fa-clock"></i>
                    ${course.duration}
                </span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => enrollInCourse(course));
    return card;
}

// Filter courses
function filterCourses(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Find the clicked button more reliably
    const clickedBtn = event.target.closest('.filter-btn');
    if (clickedBtn) {
        clickedBtn.classList.add('active');
        clickedBtn.setAttribute('aria-pressed', 'true');
    }

    // Load filtered courses
    loadCourses(category);
}

// Enroll in course
function enrollInCourse(course) {
    if (!currentUser) {
        showLoginModal();
        return;
    }

    // Add course to user progress
    const existingCourse = userProgress.progress.find(p => p.courseId === course.id);
    if (!existingCourse) {
        userProgress.progress.push({
            courseId: course.id,
            courseTitle: course.title,
            progress: 0,
            startedAt: new Date().toISOString()
        });
        userProgress.coursesEnrolled++;
        
        // Show success message
        showNotification(`Successfully enrolled in ${course.title}!`, 'success');
        
        // Update dashboard
        updateDashboard();
        saveUserProgress();
    } else {
        showNotification(`You are already enrolled in ${course.title}`, 'info');
    }
}

// Quiz Functions
function startQuiz(subject) {
    currentQuiz = subject;
    currentQuestionIndex = 0;
    quizAnswers = [];
    
    const questions = quizQuestions[subject];
    
    // Update quiz UI
    document.getElementById('quizTitle').textContent = `${subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz`;
    document.getElementById('totalQuestions').textContent = questions.length;
    
    // Show quiz questions, hide selection
    document.getElementById('quizSelection').classList.add('hidden');
    document.getElementById('quizQuestions').classList.remove('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    
    // Load first question
    loadQuestion();
}

function loadQuestion() {
    const questions = quizQuestions[currentQuiz];
    const question = questions[currentQuestionIndex];
    
    document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;
    
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `
        <div class="question-text">${question.question}</div>
        <div class="question-options">
            ${question.options.map((option, index) => `
                <label class="option-label">
                    <input type="radio" name="answer" value="${index}">
                    <span>${option}</span>
                </label>
            `).join('')}
        </div>
    `;
    
    // Add event listeners to options
    document.querySelectorAll('.option-label').forEach(label => {
        label.addEventListener('click', function() {
            document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input').checked = true;
        });
    });
    
    // Update button visibility
    document.getElementById('prevBtn').style.display = currentQuestionIndex === 0 ? 'none' : 'block';
    document.getElementById('nextBtn').style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'block';
    document.getElementById('submitBtn').style.display = currentQuestionIndex === questions.length - 1 ? 'block' : 'none';
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        showNotification('Please select an answer before continuing', 'warning');
        return;
    }
    
    quizAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions[currentQuiz].length) {
        loadQuestion();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        
        // Restore previous answer if exists
        if (quizAnswers[currentQuestionIndex] !== undefined) {
            const options = document.querySelectorAll('input[name="answer"]');
            options[quizAnswers[currentQuestionIndex]].checked = true;
            options[quizAnswers[currentQuestionIndex]].parentElement.classList.add('selected');
        }
    }
}

function submitQuiz() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        showNotification('Please select an answer before submitting', 'warning');
        return;
    }
    
    quizAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    
    // Calculate score
    const questions = quizQuestions[currentQuiz];
    let correctCount = 0;
    
    for (let i = 0; i < questions.length; i++) {
        if (quizAnswers[i] === questions[i].correct) {
            correctCount++;
        }
    }
    
    const percentage = Math.round((correctCount / questions.length) * 100);
    
    // Show results
    showQuizResults(correctCount, questions.length, percentage);
    
    // Update user progress if logged in
    if (currentUser) {
        updateUserQuizScore(percentage);
    }
}

function showQuizResults(correct, total, percentage) {
    document.getElementById('quizQuestions').classList.add('hidden');
    document.getElementById('quizResults').classList.remove('hidden');
    
    let message = '';
    if (percentage >= 80) {
        message = `Excellent! You got ${correct} out of ${total} questions correct (${percentage}%)`;
    } else if (percentage >= 60) {
        message = `Good job! You got ${correct} out of ${total} questions correct (${percentage}%)`;
    } else {
        message = `You got ${correct} out of ${total} questions correct (${percentage}%). Keep practicing!`;
    }
    
    document.getElementById('scoreMessage').textContent = message;
}

function resetQuiz() {
    currentQuiz = null;
    currentQuestionIndex = 0;
    quizAnswers = [];
    
    document.getElementById('quizSelection').classList.remove('hidden');
    document.getElementById('quizQuestions').classList.add('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizTitle').textContent = 'Select a Quiz';
    document.getElementById('questionNumber').textContent = '0';
    document.getElementById('totalQuestions').textContent = '0';
}

// Dashboard Functions
function updateDashboard() {
    document.getElementById('coursesEnrolled').textContent = userProgress.coursesEnrolled;
    document.getElementById('quizScores').textContent = userProgress.quizScores + '%';
    document.getElementById('studyTime').textContent = userProgress.studyTime + 'h';
    document.getElementById('certificates').textContent = userProgress.certificates;
    
    // Update progress list
    const progressList = document.getElementById('progressList');
    progressList.innerHTML = '';
    
    if (userProgress.progress.length === 0) {
        progressList.innerHTML = '<p style="text-align: center; color: #718096;">No courses enrolled yet. Browse our courses to get started!</p>';
    } else {
        userProgress.progress.forEach(item => {
            const progressItem = createProgressItem(item);
            progressList.appendChild(progressItem);
        });
    }
}

function createProgressItem(progress) {
    const div = document.createElement('div');
    div.className = 'progress-item';
    div.innerHTML = `
        <div class="progress-header">
            <span class="progress-title">${progress.courseTitle}</span>
            <span class="progress-percentage">${progress.progress}%</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress.progress}%"></div>
        </div>
    `;
    return div;
}

function updateUserQuizScore(score) {
    // Update average quiz score
    if (userProgress.quizScores === 0) {
        userProgress.quizScores = score;
    } else {
        userProgress.quizScores = Math.round((userProgress.quizScores + score) / 2);
    }
    
    // Add study time (mock data)
    userProgress.studyTime += 0.5;
    
    updateDashboard();
    saveUserProgress();
}

// Login Functions
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('hidden');
    
    // Focus the first input field
    setTimeout(() => {
        document.getElementById('email').focus();
    }, 100);
    
    // Add keyboard event listener
    modal.addEventListener('keydown', handleModalKeydown);
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.add('hidden');
    modal.removeEventListener('keydown', handleModalKeydown);
}

function handleModalKeydown(event) {
    if (event.key === 'Escape') {
        closeLoginModal();
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'warning');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'warning');
        return;
    }
    
    // Mock authentication (in real app, this would be server-side)
    try {
        currentUser = {
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        closeLoginModal();
        updateLoginButton();
        showNotification('Successfully logged in!', 'success');
        
        // Reset form
        document.getElementById('loginForm').reset();
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please try again.', 'error');
    }
}

function updateLoginButton() {
    const loginBtn = document.querySelector('.login-btn');
    if (currentUser) {
        loginBtn.textContent = currentUser.name;
        loginBtn.onclick = logout;
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.textContent = 'Login';
    loginBtn.onclick = showLoginModal;
    
    showNotification('Successfully logged out!', 'info');
}

// User Progress Functions
function saveUserProgress() {
    if (currentUser) {
        try {
            localStorage.setItem(`progress_${currentUser.email}`, JSON.stringify(userProgress));
        } catch (error) {
            console.warn('Failed to save user progress:', error);
            showNotification('Unable to save progress. Storage may be full.', 'warning');
        }
    }
}

function loadUserProgress() {
    try {
        // Check if user is logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            updateLoginButton();
            
            // Load user progress
            const savedProgress = localStorage.getItem(`progress_${currentUser.email}`);
            if (savedProgress) {
                userProgress = JSON.parse(savedProgress);
            }
        }
    } catch (error) {
        console.warn('Failed to load user progress:', error);
        // Reset to default values on error
        currentUser = null;
        userProgress = {
            coursesEnrolled: 0,
            quizScores: 0,
            studyTime: 0,
            certificates: 0,
            progress: []
        };
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showNotification(message, type = 'info') {
    // Sanitize message to prevent XSS
    const sanitizedMessage = message.replace(/[<>&"']/g, function(match) {
        const escape = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escape[match];
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = document.createElement('i');
    icon.className = `fas ${getNotificationIcon(type)}`;
    
    const text = document.createElement('span');
    text.textContent = sanitizedMessage;
    
    notification.appendChild(icon);
    notification.appendChild(text);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${getNotificationColor(type)};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'error': return 'fa-times-circle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#48bb78';
        case 'warning': return '#f6ad55';
        case 'error': return '#fc8181';
        default: return '#667eea';
    }
}

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Remove duplicate mobile menu functionality - now handled in setupEventListeners