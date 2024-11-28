// Project data
const projectData = {
    'bigmart': {
        title: 'Bigmart Sales Analysis',
        metrics: 'R² Score: 74%',
        description: 'Developed a comprehensive sales analysis system for Bigmart using machine learning algorithms.',
        code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Load and preprocess data
df = pd.read_csv('bigmart_data.csv')
X = df.drop('Item_Outlet_Sales', axis=1)
y = df['Item_Outlet_Sales']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Evaluate
r2_score = model.score(X_test, y_test)`,
        output: `Model Performance:
R² Score: 0.74
MSE: 1205.32
RMSE: 34.72`
    },
    'loan': {
        title: 'Loan Prediction',
        metrics: 'Accuracy: 87%',
        description: 'Built an ML-based model for predicting loan defaults using classification algorithms.',
        code: `import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Prepare data
df = pd.read_csv('loan_data.csv')
X = df.drop('Loan_Status', axis=1)
y = df['Loan_Status']

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)`,
        output: `Model Performance:
Accuracy: 87%
Precision: 85%
Recall: 89%
F1-Score: 87%`
    },
    'health': {
        title: 'Health Insurance Cost Prediction',
        metrics: 'R² Score: 82%',
        description: 'Developed a regression model for predicting health insurance costs with high accuracy.',
        code: `import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# Load data
df = pd.read_csv('insurance.csv')
X = df.drop('charges', axis=1)
y = df['charges']

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
r2 = r2_score(y_test, predictions)`,
        output: `Model Performance:
R² Score: 0.82
MAE: $2,341
RMSE: $3,567`
    },
    'sentiment': {
        title: 'Sentiment Analysis',
        metrics: 'Accuracy: 91%',
        description: 'NLP-based sentiment analysis system for customer reviews using BERT.',
        code: `import torch
from transformers import BertTokenizer, BertForSequenceClassification

# Load model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased')

# Preprocess text
inputs = tokenizer(text, return_tensors="pt")
outputs = model(**inputs)

# Get predictions
predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)`,
        output: `Model Performance:
Accuracy: 91%
Precision: 89%
Recall: 92%
F1-Score: 90%`
    },
    'clustering': {
        title: 'Customer Segmentation',
        metrics: 'Silhouette: 0.68',
        description: 'K-means clustering for customer segmentation based on behavior.',
        code: `from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Prepare data
X = df[['recency', 'frequency', 'monetary']]
X_scaled = StandardScaler().fit_transform(X)

# Train model
kmeans = KMeans(n_clusters=4, random_state=42)
clusters = kmeans.fit_predict(X_scaled)

# Evaluate
silhouette = silhouette_score(X_scaled, clusters)`,
        output: `Clustering Results:
Number of Clusters: 4
Silhouette Score: 0.68
Inertia: 156.32`
    }
};

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');

    modalTitle.textContent = project.title;
    
    modalBody.innerHTML = `
        <div class="mb-4">
            <h5>Description</h5>
            <p>${project.description}</p>
            <div class="badge bg-primary">${project.metrics}</div>
        </div>
        
        <div class="mb-4">
            <h5>Code Implementation</h5>
            <pre><code class="language-python">${project.code}</code></pre>
        </div>
        
        <div>
            <h5>Output and Results</h5>
            <pre><code class="language-plaintext">${project.output}</code></pre>
        </div>
    `;

    // Initialize syntax highlighting
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });

    // Show modal
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Function to open dashboard images in full size
function openImage(imagePath) {
    if (imagePath) {
        window.open(imagePath, '_blank');
    }
}

// Function to open current carousel slide in full size
function openCurrentSlide(carouselId) {
    const carousel = document.getElementById(carouselId);
    const activeSlide = carousel.querySelector('.carousel-item.active img');
    if (activeSlide && activeSlide.src) {
        window.open(activeSlide.src, '_blank');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Create modal elements
    const previewModal = document.createElement('div');
    previewModal.className = 'preview-modal';
    previewModal.innerHTML = `
        <button class="close-btn">&times;</button>
        <div class="preview-content"></div>
    `;
    document.body.appendChild(previewModal);

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    document.body.appendChild(backdrop);

    // Handle dashboard preview buttons
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.dashboard-card');
            
            // Check if it's the SQL carousel
            const carousel = card.querySelector('#sql-carousel');
            if (carousel) {
                openCurrentSlide('sql-carousel');
            } else {
                // For single image dashboards
                const img = card.querySelector('.dashboard-preview img');
                if (img && img.src) {
                    openImage(img.src);
                }
            }
        });
    });

    // Close preview modal
    previewModal.querySelector('.close-btn').addEventListener('click', () => {
        previewModal.classList.remove('active');
        backdrop.style.display = 'none';
        previewModal.querySelector('.preview-content').innerHTML = '';
    });

    // Close preview when clicking outside
    backdrop.addEventListener('click', () => {
        previewModal.classList.remove('active');
        backdrop.style.display = 'none';
        previewModal.querySelector('.preview-content').innerHTML = '';
    });

    // Close preview with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            previewModal.classList.remove('active');
            backdrop.style.display = 'none';
            previewModal.querySelector('.preview-content').innerHTML = '';
        }
    });

    // Initialize Bootstrap carousel
    const carousel = document.querySelector('#sql-carousel');
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 3000,
            wrap: true
        });
    }

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function(tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize code highlighting
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });

    // Initialize carousel
    var sqlCarousel = new bootstrap.Carousel(document.getElementById('sqlCarousel'), {
        interval: 5000,  // Change slides every 5 seconds
        wrap: true,      // Continuous loop
        keyboard: true   // Keyboard controls
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            sqlCarousel.prev();
        } else if (event.key === 'ArrowRight') {
            sqlCarousel.next();
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Project card hover animations
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Typing Animation
    const typed = new Typed('.typed-text', {
        strings: [
            'Data Scientist',
            'Machine Learning Engineer',
            'Python Developer',
            'Data Analyst'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Initialize Tilt Effect
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.2
    });

    // Ripple Effect
    const cards = document.querySelectorAll('.project-card, .skill-card, .experience-item, .education-item');
    
    cards.forEach(card => {
        card.classList.add('ripple');
        
        card.addEventListener('click', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // 3D Flip Animation on Scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('flip-card');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.skill-card, .project-card, .experience-item, .education-item');
    elements.forEach(el => observer.observe(el));

    // Bounce Effect on Hover
    document.querySelectorAll('.project-card, .skill-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('bounce');
        });
        
        card.addEventListener('animationend', function() {
            this.classList.remove('bounce');
        });
    });
});
