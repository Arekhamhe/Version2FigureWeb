// Domain Page JavaScript

// DOM Elements
const domainSearchForm = document.querySelector('.domain-search-form');
const domainSearchInput = document.getElementById('domainSearchInput');
const searchBtn = document.querySelector('.search-btn');
const searchResults = document.getElementById('searchResults');
const extensionTags = document.querySelectorAll('.extension-tag');

// Transfer Form Elements
const transferForm = document.querySelector('.transfer-form form');
const transferDomain = document.getElementById('transferDomain');
const authCode = document.getElementById('authCode');
const transferTerms = document.getElementById('transferTerms');

// Bulk Registration Elements
const bulkForm = document.querySelector('.bulk-form form');
const bulkDomains = document.getElementById('bulkDomains');
const bulkExtension = document.getElementById('bulkExtension');
const bulkYears = document.getElementById('bulkYears');
const domainCount = document.querySelector('.domain-count');
const totalDomains = document.getElementById('totalDomains');
const estimatedCost = document.getElementById('estimatedCost');
const bulkDiscount = document.getElementById('bulkDiscount');
const finalTotal = document.getElementById('finalTotal');

// Extension Prices
const extensionPrices = {
    '.com': 12.99,
    '.net': 14.99,
    '.org': 13.99,
    '.io': 49.99,
    '.co': 29.99
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Add smooth scrolling for navigation links
    addSmoothScrolling();
    
    // Initialize domain search
    initializeDomainSearch();
    
    // Initialize transfer form
    initializeTransferForm();
    
    // Initialize bulk registration
    initializeBulkRegistration();
    
    // Add extension tag click handlers
    initializeExtensionTags();
    
    // Add scroll animations
    initializeScrollAnimations();
}

function addSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeDomainSearch() {
    if (!domainSearchForm) return;
    
    domainSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performDomainSearch();
    });
    
    // Real-time search suggestions
    domainSearchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 2) {
            showSearchSuggestions(query);
        }
    });
}

function performDomainSearch() {
    const query = domainSearchInput.value.trim();
    
    if (!query) {
        showAlert('Please enter a domain name to search.', 'warning');
        return;
    }
    
    // Show loading state
    showSearchLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        showSearchLoading(false);
        displaySearchResults(query);
    }, 2000);
}

function showSearchLoading(isLoading) {
    const btnText = searchBtn.querySelector('.btn-text');
    const btnLoading = searchBtn.querySelector('.btn-loading');
    
    if (isLoading) {
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        searchBtn.disabled = true;
    } else {
        btnText.classList.remove('d-none');
        btnLoading.classList.add('d-none');
        searchBtn.disabled = false;
    }
}

function displaySearchResults(query) {
    const extensions = ['.com', '.net', '.org', '.io', '.co', '.info', '.biz', '.me'];
    const resultsGrid = searchResults.querySelector('.results-grid');
    
    let resultsHTML = '';
    
    extensions.forEach(ext => {
        const isAvailable = Math.random() > 0.3; // Random availability
        const price = extensionPrices[ext] || 19.99;
        
        resultsHTML += `
            <div class="result-item ${isAvailable ? 'available' : 'unavailable'}">
                <div class="domain-name">${query}${ext}</div>
                <div class="domain-status">
                    ${isAvailable ? 
                        `<span class="status available"><i class="fas fa-check"></i> Available</span>
                         <span class="price">$${price}/year</span>
                         <button class="btn btn-sm btn-primary add-to-cart">Add to Cart</button>` :
                        `<span class="status unavailable"><i class="fas fa-times"></i> Unavailable</span>
                         <button class="btn btn-sm btn-outline-secondary" disabled>Not Available</button>`
                    }
                </div>
            </div>
        `;
    });
    
    resultsGrid.innerHTML = resultsHTML;
    searchResults.classList.remove('d-none');
    
    // Add click handlers for add to cart buttons
    const addToCartBtns = resultsGrid.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const domainName = this.closest('.result-item').querySelector('.domain-name').textContent;
            addToCart(domainName);
        });
    });
}

function showSearchSuggestions(query) {
    // This would typically connect to a real API
    console.log('Showing suggestions for:', query);
}

function addToCart(domainName) {
    showAlert(`${domainName} has been added to your cart!`, 'success');
}

function initializeTransferForm() {
    if (!transferForm) return;
    
    transferForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processTransfer();
    });
    
    // Domain validation
    transferDomain.addEventListener('blur', function() {
        validateDomain(this.value);
    });
}

function processTransfer() {
    const domain = transferDomain.value.trim();
    const code = authCode.value.trim();
    const termsAccepted = transferTerms.checked;
    
    // Validation
    if (!domain) {
        showAlert('Please enter the domain you want to transfer.', 'warning');
        transferDomain.focus();
        return;
    }
    
    if (!validateDomain(domain)) {
        showAlert('Please enter a valid domain name.', 'warning');
        transferDomain.focus();
        return;
    }
    
    if (!code) {
        showAlert('Please enter the authorization code.', 'warning');
        authCode.focus();
        return;
    }
    
    if (!termsAccepted) {
        showAlert('Please accept the transfer terms and conditions.', 'warning');
        return;
    }
    
    // Simulate transfer process
    showAlert('Transfer request submitted successfully! You will receive a confirmation email shortly.', 'success');
    transferForm.reset();
}

function validateDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
}

function initializeBulkRegistration() {
    if (!bulkForm) return;
    
    bulkForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processBulkRegistration();
    });
    
    // Update calculations when domains change
    bulkDomains.addEventListener('input', updateBulkCalculations);
    bulkExtension.addEventListener('change', updateBulkCalculations);
    bulkYears.addEventListener('change', updateBulkCalculations);
    
    // Initial calculation
    updateBulkCalculations();
}

function updateBulkCalculations() {
    const domains = bulkDomains.value.trim().split('\n').filter(domain => domain.trim());
    const extension = bulkExtension.value;
    const years = parseInt(bulkYears.value);
    const pricePerDomain = extensionPrices[extension] || 19.99;
    
    const domainCountValue = domains.length;
    const estimatedCostValue = domainCountValue * pricePerDomain * years;
    const discountRate = domainCountValue >= 10 ? 0.1 : 0; // 10% discount for 10+ domains
    const discountAmount = estimatedCostValue * discountRate;
    const finalTotalValue = estimatedCostValue - discountAmount;
    
    // Update display
    domainCount.textContent = `${domainCountValue} domains`;
    totalDomains.textContent = domainCountValue;
    estimatedCost.textContent = `$${estimatedCostValue.toFixed(2)}`;
    bulkDiscount.textContent = `-$${discountAmount.toFixed(2)}`;
    finalTotal.textContent = `$${finalTotalValue.toFixed(2)}`;
    
    // Show/hide discount
    const discountItem = document.querySelector('.summary-item.discount');
    if (discountRate > 0) {
        discountItem.style.display = 'flex';
    } else {
        discountItem.style.display = 'none';
    }
}

function processBulkRegistration() {
    const domains = bulkDomains.value.trim().split('\n').filter(domain => domain.trim());
    
    if (domains.length === 0) {
        showAlert('Please enter at least one domain name.', 'warning');
        bulkDomains.focus();
        return;
    }
    
    if (domains.length > 100) {
        showAlert('Maximum 100 domains allowed per bulk registration.', 'warning');
        return;
    }
    
    // Validate domains
    const invalidDomains = domains.filter(domain => !validateDomainForBulk(domain));
    if (invalidDomains.length > 0) {
        showAlert(`Invalid domain names found: ${invalidDomains.join(', ')}`, 'warning');
        return;
    }
    
    // Simulate bulk registration process
    showAlert(`Bulk registration request for ${domains.length} domains submitted successfully!`, 'success');
}

function validateDomainForBulk(domain) {
    // More lenient validation for bulk (allows domains without extensions)
    const trimmedDomain = domain.trim();
    return trimmedDomain.length > 0 && !/\s/.test(trimmedDomain);
}

function initializeExtensionTags() {
    extensionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const extension = this.textContent.split(' ')[0]; // Get extension part
            domainSearchInput.value = domainSearchInput.value.replace(/\.[a-z]+$/i, '') + extension;
            domainSearchInput.focus();
        });
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.search-container, .transfer-form, .bulk-form, .feature-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Add CSS for search results
const searchResultsCSS = `
<style>
.search-results {
    margin-top: 40px;
}

.results-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #e9ecef;
}

.results-header h4 {
    color: #333;
    font-weight: 600;
    margin: 0;
}

.results-grid {
    display: grid;
    gap: 16px;
}

.result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.result-item:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
}

.result-item.available {
    border-left: 4px solid #28a745;
}

.result-item.unavailable {
    border-left: 4px solid #dc3545;
    opacity: 0.7;
}

.domain-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
}

.domain-status {
    display: flex;
    align-items: center;
    gap: 16px;
}

.status {
    font-size: 14px;
    font-weight: 500;
}

.status.available {
    color: #28a745;
}

.status.unavailable {
    color: #dc3545;
}

.price {
    font-weight: 600;
    color: #667eea;
}

.animate-in {
    animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
`;

// Inject CSS
document.head.insertAdjacentHTML('beforeend', searchResultsCSS);