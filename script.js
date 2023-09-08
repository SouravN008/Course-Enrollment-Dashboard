// Sample course data (replace with your actual data)
let courses = [
       {
           id: 1,
           title: 'Web Development Fundamentals',
           description: 'Learn the basics of web development, including HTML, CSS, and JavaScript.',
           instructor: 'Professor David Williams',
           enrolled: false,
           subject: 'Web Development',
       },
       {
           id: 2,
           title: 'Python Programming for Beginners',
           description: 'Start your coding journey with Python, a versatile and beginner-friendly language.',
           instructor: 'Dr. Emily Roberts',
           enrolled: false,
           subject: 'Programming Language',
       },
       {
           id: 3,
           title: 'Full-Stack JavaScript Development',
           description: 'Master both front-end and back-end web development using JavaScript and Node.js.',
           instructor: 'John Doe',
           enrolled: false,
           subject: 'Web Development',
       },
       {
           id: 4,
           title: 'Data Science and Machine Learning',
           description: 'Dive into the world of data science, explore machine learning algorithms, and analyze data.',
           instructor: 'Dr. Maria Rodriguez',
           enrolled: false,
           subject: 'Data Science',
       },
       {
              id: 5,
              title: 'App Development',
              description: 'Basic app development functionality and roadmap.',
              instructor: 'Sourav Nag',
              enrolled: false,
              subject: 'Coding',
          },
          {
              id: 6,
              title: 'DBMS',
              description: 'Deep drive into the database management systems and SQL and noSQL type databases.',
              instructor: 'Dr. Henrics Willson',
              enrolled: false,
              subject: 'Coding',
          }
          
          
   ]
   
   
   const itemsPerPage = 6;
   let currentPage = 1;
   let filteredCourses = [];
   
   function displayCourses() {
       const courseListing = document.getElementById('course-listing');
       courseListing.innerHTML = ''; // Clear existing content
   
       const coursesToDisplay = filteredCourses.slice(
           (currentPage - 1) * itemsPerPage,
           currentPage * itemsPerPage
       );
   
       coursesToDisplay.forEach(course => {
           const courseElement = document.createElement('div');
           courseElement.classList.add('course-card'); // Add a class for styling
           courseElement.innerHTML = `
               <h2>${course.title}</h2>
               <p>${course.description}</p>
               <p>Instructor: ${course.instructor}</p>
               <p>${course.enrolled ? 'Enrolled' : 'Not Enrolled'}</p>
               <button class="enroll-button" data-course-id="${course.id}">${course.enrolled ? 'Unenroll' : 'Enroll'}</button>
           `;
           courseListing.appendChild(courseElement);
   
           // Add click event listener to enroll/unenroll buttons
           const enrollButton = courseElement.querySelector('.enroll-button');
           enrollButton.addEventListener('click', () => toggleEnrollment(course.id));
       });
   
       updatePagination();
   }
   
   function toggleEnrollment(courseId) {
       const course = filteredCourses.find(course => course.id === courseId);
       if (course) {
           course.enrolled = !course.enrolled;
           updateLocalStorage(); // Update local storage
           displayCourses(); // Update the course listing
           displayEnrolledCourses(); // Update the enrolled courses section
       }
   }
   
   function updateLocalStorage() {
       localStorage.setItem('enrolledCourses', JSON.stringify(filteredCourses.filter(course => course.enrolled)));
   }
   
   function getEnrolledCoursesFromLocalStorage() {
       const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses'));
       if (enrolledCourses) {
           courses.forEach(course => {
               course.enrolled = enrolledCourses.some(enrolledCourse => enrolledCourse.id === course.id);
           });
       }
   }
   
   function applyFilters() {
       const instructorFilter = document.getElementById('instructor-filter').value;
       const subjectFilter = document.getElementById('subject-filter').value;
   
       filteredCourses = courses.filter(course => {
           return (
               (instructorFilter === '' || course.instructor === instructorFilter) &&
               (subjectFilter === '' || course.subject === subjectFilter)
           );
       });
   
       currentPage = 1;
       displayCourses();
   }
   
   function updatePagination() {
       const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
       const pagination = document.getElementById('pagination');
       pagination.innerHTML = '';
   
       for (let i = 1; i <= totalPages; i++) {
           const pageLink = document.createElement('a');
           pageLink.textContent = i;
           pageLink.href = '#';
           pageLink.addEventListener('click', () => {
               currentPage = i;
               displayCourses();
           });
   
           pagination.appendChild(pageLink);
       }
   }
   
   function displayEnrolledCourses() {
       const enrolledCoursesSection = document.getElementById('enrolled-courses');
       enrolledCoursesSection.innerHTML = ''; // Clear existing content
   
       const enrolledCourses = filteredCourses.filter(course => course.enrolled);
       if (enrolledCourses.length > 0) {
           enrolledCourses.forEach(course => {
               const enrolledCourseElement = document.createElement('div');
               enrolledCourseElement.innerHTML = `
                   <h2>${course.title}</h2>
                   <p>${course.description}</p>
                   <p>Instructor: ${course.instructor}</p>
                   <button class="unenroll-button" data-course-id="${course.id}">Unenroll</button>
               `;
               enrolledCoursesSection.appendChild(enrolledCourseElement);
   
               // Add click event listener to unenroll buttons
               const unenrollButton = enrolledCourseElement.querySelector('.unenroll-button');
               unenrollButton.addEventListener('click', () => toggleEnrollment(course.id));
           });
       } else {
           enrolledCoursesSection.innerHTML = '<p>No enrolled courses.</p>';
       }
   }
   
   // Function to populate instructor and subject filter options
   function populateFilterOptions() {
       const instructorFilter = document.getElementById('instructor-filter');
       const subjectFilter = document.getElementById('subject-filter');
   
       // Get unique instructors and subjects from the course data
       const uniqueInstructors = [...new Set(courses.map(course => course.instructor))];
       const uniqueSubjects = [...new Set(courses.map(course => course.subject))];
   
       // Populate filter options
       uniqueInstructors.forEach(instructor => {
           const option = document.createElement('option');
           option.value = instructor;
           option.textContent = instructor;
           instructorFilter.appendChild(option);
       });
   
       uniqueSubjects.forEach(subject => {
           const option = document.createElement('option');
           option.value = subject;
           option.textContent = subject;
           subjectFilter.appendChild(option);
       });
   }
   
   function searchCourses(searchTerm) {
       searchTerm = searchTerm.toLowerCase();
       filteredCourses = courses.filter(course =>
           course.title.toLowerCase().includes(searchTerm)
       );
       currentPage = 1;
       displayCourses();
   }
   
   // Event listener for the search button
   const searchButton = document.getElementById('search-button');
   searchButton.addEventListener('click', () => {
       const searchTerm = document.getElementById('course-search').value;
       searchCourses(searchTerm);
   });
   
   // Pagination: Update pagination function
   
   // Simulate user authentication with different users and their enrolled courses
   function simulateUserAuthentication() {
       // In a real application, you would implement proper user authentication.
       // For this simulation, we'll assume two users with different enrolled courses.
   
       const user1EnrolledCourses = [1, 3]; // Course IDs that user 1 is enrolled in
       const user2EnrolledCourses = [2, 4]; // Course IDs that user 2 is enrolled in
   
       courses.forEach(course => {
           if (user1EnrolledCourses.includes(course.id)) {
               course.enrolled = true;
           }
       });
   
       // To simulate a different user, you can switch the enrolled courses
       // based on user authentication or any other logic.
   }
   
   // Initial setup including user simulation
   getEnrolledCoursesFromLocalStorage();
   filteredCourses = courses.slice(); // Copy all courses initially
   populateFilterOptions();
   displayCourses();
   displayEnrolledCourses();
   simulateUserAuthentication(); // Simulate different users
   