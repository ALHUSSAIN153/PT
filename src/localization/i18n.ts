import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      pages: {
        // Header
        Header: {
          navProjects: "Projects",
          navServices: "Services",
          navContact: "Contact",
          login: "Log in",
          switchLanguage: "العربية",
        },

        // Footer
        Footer: {
          footerTitle: "Tell Me About Your Next Creative Project",
          footerSubtitle:
            "Let’s create captivating digital experiences that engage audiences and drive meaningful brand interactions across diverse platforms.",
          footerContactBtn: "Contact Me",
          footerProjectsBtn: "See My Project",
          footerCopyright:
            "Copyright © 2026 ALHUSSAIN Smart Node [ASN]. All rights reserved.",
          footerOmaniPassion: "Made with Omani passion",
        },

        // Hero
        Hero: {
          heroTitleLine1: "Transforming your digital ideas",
          heroTitleLine2: "Into a tangible reality",
          heroDescription:
            "Welcome to the ALHUSSAIN Smart Node platform, where I combine artistic creativity with programming precision to build outstanding websites that meet your unique needs and achieve your ambitious goals.",
          heroTalkToMe: "Talk to me",
          heroViewMyWork: "View my work",
        },

        // About Me
        AboutMe: {
          aboutAvailable: "Available",
          aboutBasedIn: "// BASED IN OMAN",
          aboutTitle: "I am Al-Hussein, passionate about digital excellence.",
          aboutBio1:
            "I am more than just a web developer; I am your partner in digital success. I believe every project is a unique story, and I strive to tell yours through custom designs and robust code. Innovation, quality, and client satisfaction are my top priorities, ensuring you receive digital solutions that endure and evolve alongside you.",
          aboutBio2:
            "I pay attention to the finest details—from the initial concept to the final launch—to ensure an exceptional user experience that boosts your digital presence and delivers tangible results.",
          aboutRoleTag: "UI/UX Interaction Designer",
          aboutDiscoverServices: "Discover my services",
          aboutSkillsExpertise: "Expertise",
          aboutSkillsCore: "Core Skills",
          aboutLiveCoding: "Live Coding",
          aboutOutputLabel: "Output",
          productDesign: "Product Design",
          uxDesign: "UX Design",
          uiDesign: "UI Design",
          interactionDesign: "Interaction Design",
          webflow: "Webflow",
          uxResearch: "UX Research",
          framer: "Framer",
          branding: "Branding",
          smart: "Smart",
          noCode: "No-Code",
          thinker: "Thinker",
          motionDesign: "Motion Design",
          designSystems: "Design Systems",
          prototyping: "Prototyping",
          accessibility: "Accessibility",
          creativeCoding: "Creative Coding",
        },

        // FAQ Section
        faq: {
          badge: "FAQS",
          title: "Questions? Answers!",
          subtitle:
            "Find quick answers to the most common questions about the services offered.",
          q1: "What services do you offer?",
          a1: "I specialize in web design, branding, UI/UX, and Framer development, creating modern, user-friendly experiences tailored to your needs.",
          q2: "Do you provide revisions?",
          a2: "Yes, I offer multiple rounds of revisions to ensure the final design perfectly aligns with your expectations and business goals.",
          q3: "Is there a limit to how many requests I can have?",
          a3: "Nope! When we say unlimited, we mean unlimited. Once you've subscribed, you can add as many design requests to your queue as you'd like and they'll be delivered one by one.",
          q4: "How do I start working with you?",
          a4: "You can start by reaching out via the contact form or booking a discovery call. We will discuss your project scope, timeline, and goals.",
          q5: "What is your pricing structure?",
          a5: "Pricing depends entirely on the project complexity, features, and timeline. I provide transparent, value-based flat rates after our initial consultation.",
          q6: "How long does a project take?",
          a6: "On average, most requests are completed in 2-3 days. However, more complex requests can take longer.",
        },

        // AuthPage
        auth: {
          home: "Home",
          signedOutTitle: "Signed Out",
          signedOutDesc:
            "You have been safely signed out of your account. Thank you for using ASN!",
          redirectingIn: "Redirecting to home in",
          seconds: "seconds...",
          goToHomepage: "Go to Homepage",
          or: "Or",
          signBackIn: "Sign Back In",
          signInTitle: "Sign in to ASN",
          signUpTitle: "Create account",
          fullName: "Full Name",
          fullNamePlaceholder: "John Doe",
          email: "Email",
          emailPlaceholder: "name@work-email.com",
          password: "Password",
          passwordPlaceholder: "••••••••",
          logInBtn: "Log In",
          signUpBtn: "Sign Up",
          devNote:
            "Simulation button for development and testing without a backend:",
          loginAdmin: "Log in as Admin",
          loginClient: "Log in as a client",
          googleSignIn: "Sign in with Google",
          googleSignUp: "Sign up with Google",
          githubSignIn: "Sign in with GitHub",
          githubSignUp: "Sign up with GitHub",
          dontHaveAccount: "Don't have an account?",
          alreadyHaveAccount: "Already have an account?",
          signUpLink: "Sign up",
          logInLink: "Log in",
          copyright: "ASN © {{year}}",
        },

        // Services Section
        services: {
          badge: "WHAT I OFFER",
          title: "Integrated Digital Solutions For Your Business Growth",
          subtitle:
            "From attractive UI/UX design to robust engineering, we offer a wide range of digital services covering all your business needs to help you stand out and achieve sustainable success.",
          showMore: "See More Services",
          showLess: "Show Less Services",
          items: {
            uiuxTitle: "UI/UX Design",
            uiuxSubtitle: "(UI/UX)",
            uiuxDesc:
              "Creating seamless, intuitive, and attractive user experiences that deliver your brand message clearly.",
            frontendTitle: "Front-end Web Development",
            frontendSubtitle: "(Front-end)",
            frontendDesc:
              "Transforming designs into clean, responsive, and high-performance code using React and TypeScript.",
            projectManagementTitle: "Software Project Management",
            projectManagementDesc:
              "Leading your development team towards success with a strong focus on high quality and deadlines.",
            performanceTitle: "Website Performance Optimization",
            performanceDesc:
              "Making your web application super fast, SEO-friendly, and ready for launch.",
            backendTitle: "Back-end Systems Development",
            backendSubtitle: "(Back-end)",
            backendDesc:
              "Building powerful servers and secure, fast databases ensuring stable application uptime.",
            seoTitle: "Search Engine Optimization",
            seoSubtitle: "(SEO)",
            seoDesc:
              "Helping your website rank at the top of search engine results to gain organic traffic.",
            devopsTitle: "Cloud Computing & DevOps",
            devopsDesc:
              "Deploying your project on optimal cloud servers while providing continuous monitoring and security.",
            cybersecurityTitle: "Cybersecurity & Data Protection",
            cybersecurityDesc:
              "Applying top security standards to protect user data and eliminate system vulnerabilities.",
          },
        },

        //Portfolio
        portfolio: {
          badge: "My Creations",
          title: "The Design Of Success",
          description:
            "Here, I showcase a selection of digital projects and solutions that I have developed with passion and precision.",
          trustedBy: "Trusted by {{count}}+ Audience worldwide",
          contactMe: "Contact Me",
          categories: {
            all: "All",
            web: "Web Development",
            design: "Branding & Design",
          },
          projectCategories: {
            web: "Web Development",
            design: "Visual Identity / Design",
          },
        },

        // project Details
        projectDetails: {
          backToPortfolio: "Back to Portfolio",
          responsiveDesign: "Responsive Design",
          seoOptimized: "SEO Optimized",
          saasReady: "SaaS Ready",
          tryLiveDemo: "Try Live Demo",
          chooseLicense: "Choose the right license",
          popularBadge: "Popular",
          addToCart: "Add to Cart",
          mainFeaturesTitle: "Main Template Features",
          technicalSpecsTitle: "Technical Specifications",
          relatedProjectsTitle: "Related Projects",
          viewMore: "View all",
          features: {
            saasReadyTitle: "SaaS Ready",
            saasReadyDesc:
              "Includes built-in functionality and UI components tailored for SaaS platforms to accelerate your launch.",
            seoTitle: "SEO Optimized",
            seoDesc:
              "Built with modern fast-indexing standards to ensure high rankings in search engines automatically.",
            responsiveTitle: "Fully Responsive",
            responsiveDesc:
              "Ultra performance and total responsiveness across all screens and mobile devices.",
          },
          specs: {
            designFrameworks: "Design & Frameworks",
            reactVersion: "React Version",
            supportUpdates: "Support & Updates",
            programmingLanguage: "Language",
            supportedDevices: "Supported Devices",
            environmentState: "Environment State",
            lifetimeIncluded: "Lifetime Included",
            fullTypescriptSupport: "Full TypeScript Support",
            devicesValue: "Mobile, Tablet, Desktop",
            productionReady: "Production Ready",
          },
          licenses: {
            commercial: "Commercial License",
            commercialDesc: "Full commercial access & source code",
            personal: "Personal (Non-Commercial)",
            personalDesc: "Single personal project usage",
          },
        },

        // Contact
        contact: {
          heroTitle: "Get in touch to build an",
          heroTitleHighlight: "exceptional project",
          heroDesc:
            "Book a specialized consultation to discuss your ideas and architecture, or submit a custom project request with your target budget.",
          tabConsultation: "Book Tech Consultation",
          tabInquiry: "Request Service / Project",
          consultationTitle: "Custom Tech Consultation Session",
          consultationDesc:
            "I help you analyze project requirements, choose the best tech stack, review web/SaaS UI/UX architecture, and set a clear roadmap for scalability.",
          step1Consultation: "1. Consultation Request Details",
          nameOrOrg: "Your Name / Organization",
          namePlaceholder: "e.g., Smart Solutions Co. / Ali Al-Mahrooqi",
          email: "Email Address",
          emailPlaceholder: "name@example.com",
          consultationSummary: "Consultation Summary",
          summaryPlaceholder:
            "Briefly mention topics or technical challenges you would like to discuss...",
          step2Duration: "2. Select Session Duration",
          oneHour: "1 Hour (60 mins)",
          twoHours: "2 Hours (120 mins)",
          step3Calendar: "3. Pick a Date (Available days are highlighted)",
          august2026: "August 2026",
          days: {
            sun: "Sun",
            mon: "Mon",
            tue: "Tue",
            wed: "Wed",
            thu: "Thu",
            fri: "Fri",
            sat: "Sat",
          },
          step4Time: "4. Preferred Start Time",
          confirmBooking: "Confirm & Book Consultation",
          bookingSuccessTitle: "Consultation Request Confirmed!",
          bookingSuccessDesc:
            "Thank you {{name}}. Invitation details and Google Meet link have been sent to your email.",
          bookAnother: "Book Another Session",
          inquiryTitle: "Request Service or New Project",
          inquirySubtitle:
            "Fill out the details below to start your project and receive a custom quotation.",
          inquirySuccess:
            "Your request has been sent successfully! We will review it and get back to you within 24 hours.",
          step1Personal: "1. Personal Information",
          fullName: "Full Name",
          namePlaceholderInquiry: "e.g., Mohammed Ahmed",
          phone: "Phone Number",
          companyName: "Company / Organization (Optional)",
          companyPlaceholder: "Company or project name",
          step2Project: "2. Project & Service Details",
          serviceType: "Required Service Type",
          licenseType: "Select Trial License Type",
          budget: "Estimated Project Budget",
          projectDesc: "Project Description",
          descPlaceholder:
            "Enter your project details and requirements here...",
          submitInquiry: "Submit Request",
        },
      },

      layouts: {
        // TopBar
        TopBar: {
          searchPlaceholder: "Search...",
          messagesTitle: "Messages",
          newBadge: "New",
          viewAllMessages: "View all messages",
          notificationsTitle: "Notifications",
          markAllRead: "Mark all as read",
          myProfile: "My Profile",
          accountSettings: "Account Settings",
          logout: "Logout",
          demoAdmin: "Demo Admin",
          demoClient: "Demo Client",
        },

        //Sidebar
        Sidebar: {
          // Sidebar - Groups
          groupMain: "Main",
          groupClientPortfolio: "My Work & Bookings",
          groupClientFinance: "Finance & Contracts",
          groupClientSupport: "Support & Account",
          groupAdminOperations: "Requests & Bookings",
          groupAdminProjects: "Projects & Portfolio",
          groupAdminFinanceSupport: "Finance & Support",
          groupAdminSystem: "System Settings",

          // Sidebar - Client Items
          navOverview: "Overview",
          navNotifications: "Notifications",
          navMyProjects: "My Projects",
          navMyBookings: "My Bookings",
          navRequestProject: "Request New Project",
          navInvoicesPayments: "Invoices & Payments",
          navContractsProposals: "Contracts & Proposals",
          navDirectSupport: "Direct Support",

          // Sidebar - Admin Items
          navClientsList: "Clients List",
          navTestimonials: "Testimonials",
          navProjectRequests: "Project Requests",
          navDemoRequests: "Demo Requests",
          navServicesPricing: "Services & Pricing",
          navBookingsCalendar: "Bookings & Calendar",
          navAvailabilitySetup: "Availability Setup",
          navActiveProjects: "Active Projects",
          navPortfolioCMS: "Portfolio CMS",
          navMyTasks: "My Tasks",
          navInvoicesIncome: "Invoices & Income",
          navProposalsContracts: "Proposals & Contracts",
          navSupportTickets: "Support Tickets",
          navSystemLogs: "System Logs",
          navGlobalSettings: "Global Settings",

          // Sidebar - UI Labels & Badges
          consoleRole: "Console",
          clientHubRole: "Client Hub",
          collapsePanel: "Collapse panel",
          expandPanel: "Expand panel",
          newBadgeText: "New",
          needConsultationTitle: "Need direct consultation?",
          needConsultationDesc:
            "You can book a new appointment or contact us directly via support.",
        },

        //DashboardLayout
        DashboardLayout: {
          // Tabs & Common Titles
          tabOverview: "Overview",
          tabLeads: "Leads",
          tabClients: "Clients",
          tabProjects: "Projects",
          tabTasks: "Tasks",
          tabBookings: "Bookings",
          tabInvoices: "Invoices",
          tabPortfolio: "Portfolio",
          tabBlog: "Blog",
          tabDemoRequests: "Demo Requests",
          tabAvailability: "Availability",
          tabServicesPricing: "Services & Pricing",
          tabTestimonials: "Testimonials",
          tabProposalsContracts: "Proposals & Contracts",
          tabSupportRevisions: "Support & Revisions",
          tabSystemRecords: "System Records",
          tabSettings: "Settings",
          tabMyProjects: "My Projects",
          tabNewRequest: "New Request",
          tabProfile: "Profile",
          tabSignOut: "Sign Out",
          closeTab: "Close Tab",
        },

        Admin: {
          //Admin Overview
          AdminOverview: {
            welcomeTitle: "Welcome back, Admin",
            welcomeSubtitle:
              "Here's what's happening with your business today.",
            exportReport: "Export Report",
            lastMonth: "last month:",

            // Dynamic Stats titles
            statTotalClients: "Total Clients",
            statMonthlyRevenue: "Monthly Revenue",
            statPendingInvoices: "Pending Invoices",
            statActiveProjects: "Active Projects",

            // Revenue Growth Chart
            revenueGrowth: "Revenue Growth",
            revenueOverview: "Overview of the last 6 months",
            yearBadge: "Year 2026",

            // Months
            months: {
              jan: "Jan",
              feb: "Feb",
              mar: "Mar",
              apr: "Apr",
              may: "May",
              jun: "Jun",
            },

            // Recent Activity
            recentActivity: "Recent Activity",
            realtimeUpdates: "Real-time updates on your platform",
            viewAllLogs: "View All Logs",

            // Requested Projects
            requestedProjects: "Requested Projects",
            requestedProjectsDesc: "New client requests awaiting review",
            priorityHigh: "High",
            priorityMedium: "Medium",
            priorityLow: "Low",
            viewProjectRequests: "View Project Requests",

            // Upcoming Meetings
            upcomingMeetings: "Upcoming Meetings",
            upcomingMeetingsDesc: "Scheduled client appointments",
            today: "Today",
            tomorrow: "Tomorrow",
            viewCalendar: "View Calendar",

            // Support Tickets
            supportTickets: "Support Tickets",
            supportTicketsDesc: "Latest customer issues & queries",
            statusOpen: "Open",
            statusInProgress: "In Progress",
            statusResolved: "Resolved",
            manageTickets: "Manage Tickets",

            // Recent Invoices Table
            recentInvoices: "Recent Invoices",
            recentInvoicesDesc: "Manage and track your latest billing cycles",
            viewAllInvoices: "View All Invoices →",
            colInvoiceId: "Invoice ID",
            colClient: "Client",
            colDate: "Date",
            colAmount: "Amount",
            colStatus: "Status",
            statusPaid: "Paid",
            statusPending: "Pending",
            statusOverdue: "Overdue",
          },

          //Admin Clients
          AdminClients: {
            title: "Clients Management",
            subtitle:
              "Interactive dashboard for monitoring and analyzing client networks and financial dues.",
            addNewClient: "Add New Client",
            totalClients: "Total Clients",
            activeClients: "Active Clients",
            totalSpent: "Total Investments",
            searchPlaceholder: "Search by client name, company, or email...",
            filterAll: "All",
            filterActive: "Active",
            filterLead: "Lead",
            filterInactive: "Inactive",
            viewDetails: "View Details",
            deleteClient: "Delete Client",
            totalSpentLabel: "Total Spent",
            activeProjectsCount: "{{count}} projects",
            noClientsFound: "No clients match the current search criteria.",
            deleteConfirm: "Are you sure you want to delete this client?",
            statusActive: "Active",
            statusLead: "Lead",
            statusInactive: "Inactive",
            defaultCompany: "New Company",
            defaultJobTitle: "Client",
            defaultBio: "Recently added client to the system.",
            today: "Today",

            // Add Modal
            modalAddTitle: "Add New Client",
            fullNameLabel: "Full Name *",
            fullNamePlaceholder: "e.g., Ahmed Mahmoud",
            emailLabel: "Email *",
            emailPlaceholder: "name@company.com",
            phoneLabel: "Phone Number",
            phonePlaceholder: "+966...",
            companyNameLabel: "Company Name",
            companyNamePlaceholder: "Tech Company",
            jobTitleLabel: "Job Title",
            jobTitlePlaceholder: "Project Manager",
            accountStatusLabel: "Account Status",
            initialSpentLabel: "Initial Total Spent ($)",
            cancel: "Cancel",
            saveClient: "Save Client",

            // View Modal
            modalViewTitle: "Client Details",
            clientId: "Client ID:",
            joinedDate: "Joined Date:",
            address: "Address:",
            bioTitle: "About Client:",
            noBio: "No additional details available.",
            closeWindow: "Close Window",
          },

          //Admin Testimonials
          adminTestimonials: {
            title: "Client Testimonials",
            subtitle:
              "Manage, feature, and organize customer reviews connected to your portfolio.",
            addBtn: "Add Testimonial",
            metrics: {
              total: "Total Reviews",
              totalSub: "Active feedback items",
              featured: "Featured Reviews",
              featuredSub: "Displayed in hero sections",
              avgRating: "Average Rating",
              avgRatingSub: "Based on client scores",
              linkedProjects: "Linked to Projects",
              linkedProjectsSub: "Connected portfolio items",
            },
            searchPlaceholder:
              "Search reviews by client name, company, or content...",
            featuredOnly: "Featured Only",
            generalShowcase: "General Showcase (No Project)",
            generalShowcaseShort: "General Showcase",
            status: {
              all: "All Statuses",
              published: "Published",
              pending: "Pending Review",
              pendingShort: "Pending",
              archived: "Archived",
            },
            card: {
              at: "at",
              stars: "Stars",
              markFeatured: "Mark Featured",
              featured: "Featured",
              edit: "Edit Review",
              delete: "Delete Review",
              noDataTitle: "No testimonials found",
              noDataSub: "Try adjusting your search or filter options.",
            },
            modal: {
              editTitle: "Edit Client Review",
              createTitle: "Create New Review",
              subtitle: "Configure testimonial details and parameters",
              clientName: "Client Name",
              clientNamePlaceholder: "e.g. Alex Turner",
              role: "Role / Position",
              rolePlaceholder: "e.g. CTO / Product Owner",
              company: "Company Name",
              companyPlaceholder: "e.g. Apex Innovations",
              project: "Linked Portfolio Project",
              status: "Publish Status",
              rating: "Rating",
              avatarUrl: "Avatar Image URL",
              feedback: "Testimonial Feedback",
              feedbackPlaceholder: "Write the detailed client feedback here...",
              highlightFeatured: "Highlight as Featured Review",
              cancel: "Cancel",
              save: "Save Changes",
              publish: "Publish Review",
              anonymousClient: "Anonymous Client",
              verifiedClient: "Verified Client",
              privateCompany: "Private Company",
            },
          },

          //Admin Leads
          adminLeads: {
            title: "Direct Project Requests",
            subtitle:
              "Manage, track, and update potential client requests and software licenses with ease.",
            addDemoLead: "Add Demo Request",
            demoLeadName: "Mohammed Al-Abri",
            demoLeadCompany: "Fast Innovation Est.",
            demoLeadDesc:
              "Custom request for developing a new electronic services platform integrated with a database.",

            // Stats & Filters
            statsTotal: "Total Requests",
            statsTotalDesc: "All incoming inquiries",
            statsNew: "New Requests",
            statsNewDesc: "Requires action",
            statsInReview: "Under Discussion & Review",
            statsInReviewDesc: "Contacted / Proposal review",
            statsConverted: "Agreed Projects",
            statsConvertedDesc: "Successful deals",

            filterAll: "All ({{count}})",
            searchPlaceholder: "Search by name, company, email, or phone...",
            noResultsTitle: "No Matching Results",
            noResultsDesc:
              "Try adjusting your search keyword or current status filter.",

            // Lead Card & Details
            directContact: "Direct Contact",
            deleteLead: "Delete Request",
            viewDetails: "View Details",
            deleteConfirm:
              "Are you sure you want to permanently delete this request?",
            independentClient: "Independent / Individual Client",

            // Status Labels
            status: {
              new: "New Request",
              contacted: "Contacted",
              in_review: "Under Review",
              converted: "Successful Deal",
              closed: "Closed / Cancelled",
            },

            // Modal & Sections
            detailsTitle: "Request Details #{{id}}",
            createdDate: "Created Date: {{date}}",
            currentStatusLabel: "Current Request Status:",
            whatsapp: "WhatsApp",
            email: "Email",
            clientAndCompany: "Client & Company",
            contactDetails: "Contact Info",
            servicesAndBudget: "Services & Expected Budget",
            requestedServices: "Requested Services:",
            budget: "Budget:",
            notSpecified: "Not specified",
            preferredContact: "Preferred Contact Method:",
            projectDetailsTitle: "Project & Request Details",
            internalNotesTitle: "History & Internal Notes",
            noInternalNotes: "No internal notes added yet.",
            addNotePlaceholder: "Add internal follow-up note...",
            addNoteBtn: "Add",
            closeModal: "Close",
            systemAdmin: "System Admin",
          },

          //Admin Demo Requests
          adminDemoRequests: {
            pageTitle: "Demo Requests",
            pageSubtitle:
              "Track and schedule demo requests and coordinate direct client meetings.",
            addManualBtn: "Add Manual Request",
            stats: {
              total: "Total Requests",
              pending: "Pending",
              scheduled: "Scheduled",
              completed: "Completed Successfully",
            },
            searchPlaceholder:
              "Search by client name, company, or service type...",
            filterAll: "All",
            confirmDelete:
              "Are you sure you want to permanently delete this request?",
            noRequests: "No demo requests match the current search options.",
            dateLabel: "Date:",
            status: {
              pending: "Pending",
              scheduled: "Scheduled",
              completed: "Completed",
              rejected: "Rejected",
            },
            deleteTooltip: "Delete Request",
            quickStatusTitle: "QUICK STATUS UPDATE:",
            contactDetails: "Contact Details",
            requestedDate: "Requested Date:",
            requestDate: "Created At:",
            requestedProduct: "REQUESTED PRODUCT / SERVICE:",
            clientNotes: "CLIENT NOTES & REQUIREMENTS:",
            meetingLinkTitle: "Live Demo Meeting Link (Google Meet / Zoom):",
            meetingLinkPlaceholder: "https://meet.google.com/...",
            saveBtn: "Save",
            openMeetingTooltip: "Open meeting link",
            notesSectionTitle: "Updates Log & Internal Notes",
            addNotePlaceholder: "Add a new admin note...",
            addBtn: "Add",
            noNotes: "No internal notes registered for this request yet.",
            authorAdmin: "Admin",
            selectPrompt:
              "Select a request from the list to view full details.",
            modal: {
              title: "Add New Demo Request",
              fullName: "Full Name *",
              email: "Email *",
              phone: "Phone Number *",
              companyName: "Company / Organization Name",
              requestedDate: "Requested Demo Date *",
              productOrService: "Requested Product or Service *",
              defaultProduct: "SaaS & Dashboards UI/UX Design",
              notes: "Additional Details",
              cancelBtn: "Cancel",
              submitBtn: "Save Request",
            },
          },

          //Admin Services Pricing
          AdminServicesPricing: {
            adminServicesTitle: "Services & Pricing Management",
            adminServicesSubtitle:
              "Edit and customize service packages, hourly rates, and dynamic client offers.",
            restoreDefault: "Restore Defaults",
            addNewService: "Add New Service",
            confirmDeleteService:
              "Are you sure you want to permanently delete this service?",
            confirmResetDefaults:
              "Do you want to restore default data? Any unsaved changes will be lost.",

            // Stats
            statTotalServices: "Total Services",
            statTotalServicesSub: "Organized by categories",
            statActiveServices: "Active Services",
            statActiveServicesSub: "{{percent}}% ready for live display",
            statAvgRate: "Avg. Hourly Rate",
            statAvgRateUnit: "OMR/hr",
            statAvgRateSub: "Based on project requirement complexity",
            statFeatured: "Most Requested (Featured)",
            statFeaturedSub: "Featured packages on the home page",

            // Search & Filters
            searchPlaceholder: "Search by service name or features...",
            catAll: "All Categories",
            catDev: "Development",
            catDesign: "UI/UX Design",
            catConsulting: "Tech Consulting",
            catTrial: "Trial Request",
            catGeneral: "General",

            statusAll: "All Statuses",
            statusActive: "Active Only",
            statusInactive: "Inactive Only",

            viewGrid: "Grid View",
            viewTable: "Table View",
            noResultsTitle: "No matching results found",
            noResultsSub: "Try changing your search query or selected filters",

            // Service Card & Table
            popularBadge: "Most Popular",
            noDesc: "No description available for this service.",
            estCostRange: "Est. Cost Range",
            asAgreed: "As agreed",
            hourlyRate: "Hourly Rate",
            currencyOmr: "OMR",
            includedFeatures: "Included Features:",
            noFeatures: "No special features listed yet",
            active: "Active",
            inactive: "Inactive",
            togglePopular: "Highlight as popular",
            editService: "Edit Service",
            deleteService: "Delete Service",

            // Table Headers
            tableColService: "Service & Category",
            tableColEstCost: "Est. Cost",
            tableColHourly: "Hourly Rate",
            tableColFeatures: "Features",
            tableColStatus: "Status",
            tableColActions: "Actions",

            // Modal Form
            modalEditTitle: "Edit Service Package",
            modalAddTitle: "Add New Service Package",
            modalLabelName: "Service Name",
            modalLabelCategory: "Category",
            modalLabelIcon: "Icon",
            modalLabelPriceRange: "Price Range Text",
            modalLabelHourlyRate: "Hourly Rate (OMR)",
            modalLabelDesc: "Description",
            modalLabelFeatures: "Package Features",
            modalFeaturePlaceholder:
              "Add new feature (e.g., Responsive Design)...",
            modalAddFeatureBtn: "Add Feature",
            modalLabelStatus: "Active Status",
            modalLabelPopular: "Featured Package",
            btnCancel: "Cancel",
            btnSave: "Save Changes",
          },

          //Admin Bookings
          adminBookings: {
            title: "Bookings & Advisory Sessions Management",
            subtitle:
              "Schedule sessions, track consultation statuses, and manage direct technical meeting details.",
            exportData: "Export Data",
            addBooking: "Add New Booking",
            stats: {
              total: "Total Bookings",
              confirmed: "Confirmed",
              pending: "Pending",
              completed: "Completed",
              cancelled: "Cancelled",
              estimatedRevenue: "Est. Revenue",
              omr: "OMR",
            },
            searchPlaceholder: "Search by ID, name, email, or phone...",
            statusFilter: {
              all: "All",
              pending: "Pending",
              confirmed: "Confirmed",
              completed: "Completed",
              cancelled: "Cancelled",
            },
            noBookings: "No bookings found matching search criteria",
            noBookingsDesc:
              "Check search term spelling or try clearing active filters.",
            requestedAt: "Requested at",
            duration: {
              oneHour: "1 Hour",
              twoHours: "2 Hours",
              oneHourFull: "1 Hour (60 mins)",
              twoHoursFull: "2 Hours (120 mins)",
            },
            statusLabel: {
              confirmed: "Confirmed",
              pending: "Pending",
              completed: "Completed",
              cancelled: "Cancelled",
            },
            consultationTypes: {
              all: "All Consultation Types",
              saas: "SaaS UI/UX Development",
              fullstack: "Custom Full-Stack",
              architecture: "Software Architecture",
              code_review: "Code Review",
              other: "Other",
              general: "General Consultation",
            },
            currentStatusLabel: "Current Status:",
            detailsBtn: "Details",
            deleteTitle: "Delete Booking",
            deleteConfirm:
              "Are you sure you want to permanently delete this booking?",
            modal: {
              email: "Email Address",
              phone: "Phone Number",
              notRegistered: "N/A",
              estimatedPrice: "Estimated Price",
              dateTime: "Date & Time",
              duration: "Duration",
              consultationType: "Consultation Type",
              summaryTitle: "Summary & Requirements:",
              meetingUrlLabel: "Meeting Link (Google Meet / Zoom):",
              meetingUrlPlaceholder: "https://meet.google.com/xxx-xxxx-xxx",
              openLink: "Open Link",
              notesLabel: "Internal Admin Notes:",
              notesPlaceholder:
                "Add internal session notes, agreed action items, or follow-up steps...",
              cancel: "Cancel",
              saveChanges: "Save Changes",
              addTitle: "Add New Booking Manually",
              nameOrOrg: "Name / Organization *",
              summaryPlaceholder: "Consultation summary...",
              submitAdd: "Add Booking",
            },
          },

          // Admin Availability Setup
          AdminAvailabilitySetup: {
            pageTitle: "Availability Schedule & Working Hours",
            pageDesc:
              "Define working days and holidays throughout the month, and set daily availability hours to receive client bookings and projects.",
            saveChanges: "Save Changes",
            savedSuccess: "Schedule saved successfully!",
            monthlyCalendarTitle: "Full Month Calendar",
            monthlyCalendarDesc:
              "Click on any day to toggle its status between (Working Day / Holiday)",
            workDayAvailable: "Available Work Day",
            holidayUnavailable: "Holiday / Unavailable",
            dayOffLabel: "Off",
            dayWorkLabel: "Work",
            dailyHoursTitle: "Daily Working Hours Schedule",
            dailyHoursDesc:
              "Set start and end availability hours for each day of the week",
            applyToAll: "Apply",
            applyToAllTitle: "Apply time to all enabled days",
            offStatus: "Off",
            to: "to",
            bufferTimeTitle: "Developer Break (Buffer Time)",
            bufferTimeDesc:
              "Rest time allocated between bookings to prevent overlap and give you time to review project requirements or code.",
            bufferOptions: {
              noBuffer: "No buffer time (0 min)",
              min10: "10 mins break",
              min15: "15 mins break (Recommended)",
              min30: "30 mins break",
            },
            calendarSyncTitle: "External Calendar Sync",
            calendarSyncSubtitle: "Google Calendar / Outlook",
            calendarSyncDesc:
              "Syncing prevents overlaps between client appointments and software deliverables in your personal calendar.",
            connectGoogle: "Connect Google Calendar",
            daysOfWeek: {
              sun: "Sun",
              mon: "Mon",
              tue: "Tue",
              wed: "Wed",
              thu: "Thu",
              fri: "Fri",
              sat: "Sat",
            },
            months: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          },

          // Admin Projects
          adminProjects: {
            title: "Projects Management",
            subtitle:
              "Track all active and completed projects, monitor progress rates, and manage budgets allocated to each client.",
            newProjectBtn: "New Project",
            kpiTotal: "Total Projects",
            kpiActive: "In Progress",
            kpiCompleted: "Completed Projects",
            kpiTotalBudget: "Total Budget",
            searchPlaceholder: "Search by project or client name...",
            filterAll: "All",
            filterActive: "In Progress",
            filterCompleted: "Completed",
            allClients: "All Clients",
            selectClient: "Select Client",
            statusCompleted: "Completed",
            statusOnHold: "On Hold",
            statusInProgress: "In Progress",
            progressLabel: "Progress Level",
            deliveryLabel: "Delivery:",
            noProjectsFound: "No matching projects",
            noProjectsSub: "Try changing search terms or selected filters",
            modalCreateTitle: "Add New Project",
            modalNameLabel: "Project Name",
            modalNamePlaceholder: "e.g., Sales Management Platform",
            modalClientLabel: "Select Client",
            modalBudgetLabel: "Allocated Budget ($)",
            modalStartDateLabel: "Start Date",
            modalEndDateLabel: "Estimated Completion Date",
            modalEndDatePlaceholder: "e.g., Oct 15, 2026",
            modalDescLabel: "Project Description",
            modalDescPlaceholder: "General details and scope of work...",
            cancelBtn: "Cancel",
            saveBtn: "Save Project",
            modalOverviewTitle: "Project Overview",
            modalOverallProgress: "Overall Progress",
            modalTotalBudget: "Total Budget",
            modalDeliveryDate: "Estimated Delivery Date",
            modalMilestonesTitle: "Completed Milestones & Notes",
            milestoneCompleted: "Completed",
            milestoneInProgress: "In Progress",
            newClientDefault: "New Client",
            defaultMilestoneTitle: "Phase 1: Preparation & Setup",
            defaultTask1: "Define core client requirements",
            defaultTask2: "Prepare work plan and schedule",
          },

          // Admin Portfolio
          adminPortfolio: {
            title: "Portfolio Showcase Manager",
            subtitle:
              "Publish, organize, and highlight completed projects in your public portfolio.",
            addNewProject: "Add New Project",
            editProject: "Edit Portfolio Project",
            totalItems: "Total Portfolio Items",
            publishedLive: "Published Live",
            featuredSpotlights: "Featured Spotlights",
            totalViews: "Total Views",
            searchPlaceholder:
              "Search projects by title, client, or tech stack...",
            noProjectsFound:
              "No portfolio projects found matching search filters.",
            selectedOverview: "Selected Overview",
            noDescription: "No description provided.",
            client: "Client",
            category: "Category",
            price: "Price",
            date: "Date",
            techStack: "Tech Stack",
            projectTitle: "Project Title",
            projectTitlePlaceholder: "e.g. React SaaS Template",
            versionSubtitle: "Version / Subtitle",
            versionPlaceholder: "e.g. (2026 Edition) - High Performance",
            tagBadge: "Tag / Badge",
            tagPlaceholder: "e.g. Premium Template",
            startingPrice: "Starting Price",
            startingPricePlaceholder: "e.g. $79",
            clientName: "Client Name",
            clientNamePlaceholder: "e.g. Apex Innovations",
            coverImage: "Cover Image Path/URL",
            coverImagePlaceholder: "e.g. /5.avif or https://...",
            techStackComma: "Tech Stack (comma separated)",
            techStackPlaceholder: "React, TypeScript, Tailwind CSS, Django",
            liveDemoUrl: "Live Demo URL",
            githubUrl: "GitHub Repo URL",
            description: "Description",
            descriptionPlaceholder: "Detailed project summary...",
            featuredHighlight: "Featured Highlight",
            hasCaseStudy: "Has Case Study",
            cancel: "Cancel",
            updateProject: "Update Project",
            saveProject: "Save Project",
            toggleFeatured: "Toggle Featured",
            // Categories
            allCategories: "All Categories",
            saasPlatform: "SaaS Platform",
            fullStackWeb: "Full-Stack Web",
            eCommerce: "E-Commerce",
            mobileApp: "Mobile App",
            // Statuses
            allStatuses: "All Statuses",
            published: "Published",
            draft: "Draft",
            archived: "Archived",
          },

          // Admin Tasks
          AdminTasks: {
            title: "Task Tracking & Execution",
            description:
              "Flexible and precise management for all project phases, execution tasks, and timelines.",
            addNewTask: "Add New Task",
            totalTasks: "Total Tasks",
            completedTasks: "Completed Tasks",
            pendingTasks: "Pending Tasks",
            completionRate: "Completion Rate",
            searchPlaceholder: "Search for a task...",
            allProjects: "All Projects",
            filterAll: "All",
            filterPending: "Pending",
            filterCompleted: "Completed",
            client: "Client",
            projectProgress: "Project Progress",
            tasksCompleted: "{{completed}} of {{total}} tasks completed",
            statusCompleted: "Completed",
            statusInProgress: "In Progress",
            statusPending: "Pending",
            noTasksFound: "No tasks match the filter",
            unassigned: "Unassigned",
            soon: "Soon",
            modalTitle: "Add New Task",
            taskTitleLabel: "Task Title",
            taskTitlePlaceholder: "e.g., Code review...",
            targetProjectLabel: "Target Project",
            selectProject: "Select Project",
            targetMilestoneLabel: "Milestone",
            selectMilestone: "Select Milestone",
            assigneeLabel: "Assignee",
            assigneePlaceholder: "Assignee Name",
            dueDateLabel: "Due Date",
            dueDatePlaceholder: "e.g., Sep 15",
            cancel: "Cancel",
            saveTask: "Save Task",
          },

          // Admin Invoices
          invoices: {
            title: "Advanced Invoice Management",
            subtitle:
              "Track issued invoices, financial settlements, and generate reports all in one place.",
            createNew: "Create New Invoice",
            searchPlaceholder:
              "Search by invoice number, client, or project...",
            allStatuses: "All Statuses",
            allClients: "All Clients",
            selectPlaceholder: "Select...",
            stats: {
              total: "Total Invoices",
              totalDesc: "Cumulative amount for all operations",
              paid: "Paid Amounts",
              paidDesc: "Successfully collected",
              pending: "Pending Payment",
              pendingDesc: "Within due period",
              overdue: "Overdue Amounts",
              overdueDesc: "Requires urgent follow-up",
            },
            status: {
              paid: "Paid",
              pending: "Pending",
              overdue: "Overdue",
            },
            table: {
              invoiceNumber: "Invoice #",
              client: "Client",
              project: "Project / Statement",
              amount: "Amount",
              status: "Status",
              issueDate: "Issue Date",
              dueDate: "Due Date",
              actions: "Actions",
              noData: "No invoices match the specified search criteria.",
            },
            actions: {
              viewDetails: "View Details",
              markAsPaid: "Mark as Paid",
            },
            modals: {
              createTitle: "Issue New Invoice",
              clientLabel: "Client",
              projectLabel: "Project Reference",
              titleLabel: "Invoice Title / General Description",
              titlePlaceholder: "Ex: Frontend UI & Features Development",
              dueDateLabel: "Due Date",
              dueDatePlaceholder: "Ex: September 15, 2026",
              itemsTitle: "Invoice Items & Services",
              addItem: "Add Item",
              itemDescPlaceholder: "Service / Item Description",
              quantityPlaceholder: "Qty",
              pricePlaceholder: "Price",
              totalCalculated: "Total Calculated Amount:",
              notesLabel: "Invoice Notes",
              notesPlaceholder:
                "Explanatory notes for client or bank transfer terms...",
              cancel: "Cancel",
              saveAndIssue: "Save & Issue",
              viewDetailsTitle: "Invoice Details",
              currentStatus: "Current Status",
              paymentMethod: "Payment Method",
              notSpecified: "Not specified",
              itemsTableTitle: "Items & Services Details",
              description: "Description",
              quantity: "Qty",
              unitPrice: "Unit Price",
              total: "Total",
              defaultItemDesc: "Software Development Service",
              defaultProjectTitle: "General Development Project",
            },
          },

          // Admin Proposals Contracts
          AdminProposalsContracts: {
            proposalsHeaderTitle: "Proposals & Contracts Engine",
            proposalsHeaderSub:
              "Manage, execute, and monitor digital contracts and commercial agreements.",
            createNewDocument: "Create New Document",

            // Analytics KPIs
            signedRevenueValue: "Signed Revenue Value",
            activeAgreements: "Active legally binding agreements",
            pendingDealPipeline: "Pending Deal Pipeline",
            awaitingApproval: "Awaiting client approval & e-signature",
            acceptanceRate: "Acceptance Rate",
            proposalsClosed: "Proposals successfully closed",

            // Tabs & Filters
            allDocuments: "All Documents",
            proposals: "Proposals",
            contracts: "Contracts",
            searchPlaceholder: "Search by title, client, or ID...",

            // Statuses
            allStatuses: "All Statuses",
            statusDraft: "Draft",
            statusPending: "Sent / Pending",
            statusAccepted: "Signed & Active",
            statusDeclined: "Declined",
            statusExpired: "Expired",

            // Types
            typeProposal: "Proposal",
            typeContract: "Contract",

            // Table Headers
            thDocDetails: "Document Details",
            thClientCompany: "Client & Company",
            thType: "Type",
            thContractValue: "Contract Value",
            thStatus: "Status",
            thActions: "Actions",
            noDocumentsFound:
              "No documents found matching your filter criteria.",
            issuedOn: "Issued",

            // Tooltips & Actions
            previewDetails: "Preview Document Details",
            sendToClient: "Send Document to Client",
            downloadPdf: "Download PDF",
            deleteDocument: "Delete Document",

            // Document Drawer Preview
            currentStatus: "Current Status",
            totalAmount: "Total Amount",
            clientName: "Client Name",
            companyName: "Company Name",
            legallyVerifiedSignature: "Legally Verified E-Signature",
            signedByOn: "Signed by {{name}} on {{date}}",
            scopeOfWork: "Scope of Work",
            deliverables: "Deliverables",
            activityAuditTrail: "Activity Audit Trail",
            byUser: "By {{user}}",
            closeWindow: "Close Window",

            // Modal Form
            createModalTitle: "Create New Commercial Document",
            fieldDocTitle: "Document Title",
            fieldDocTitlePlaceholder: "e.g. Enterprise E-Commerce Redesign",
            fieldClientName: "Client Name",
            fieldClientNamePlaceholder: "e.g. John Doe",
            fieldCompanyName: "Company Name",
            fieldCompanyNamePlaceholder: "e.g. Acme Corp",
            fieldDocType: "Document Type",
            fieldAmount: "Amount ($)",
            fieldPaymentTerms: "Payment Terms",
            fieldScopeOfWork: "Scope of Work (One item per line)",
            fieldDeliverables: "Deliverables (One item per line)",
            cancel: "Cancel",
            submitCreate: "Create Document",
            confirmDelete:
              "Are you sure you want to permanently delete this document?",
            downloadAlert: "Downloading signed PDF document: {{id}}",
          },

          // Admin Support And Revisions
          AdminSupportAndRevisions: {
            title: "Support & Client Revisions",
            description:
              "Review revision iterations, track core bug logs, and interact with outstanding client queries.",

            // Metrics Cards
            activeTickets: "Active Tickets",
            activeTicketsSub: "Unresolved requests needing review",
            pendingRevisions: "Pending Revisions",
            pendingRevisionsSub: "Scope adjustments requested by clients",
            criticalBugs: "Critical Bugs",
            criticalBugsSub: "Active runtime bugs affecting client apps",

            // Controls & Search
            searchPlaceholder: "Search by client name, summary, ticket ID...",

            // Filter Options
            filterAll: "All Categories",
            filterRevision: "Revision Scope",
            filterBug: "System Bug",
            filterQuestion: "Client Inquiry",

            // Status Badges & Priority
            priorityHigh: "High",
            priorityMedium: "Medium",
            priorityLow: "Low",
            statusPending: "Pending",
            statusInProgress: "In Progress",
            statusResolved: "Resolved",
            cycleStatusTooltip: "Click to cycle request status",

            // Actions & Empty States
            replyBtn: "Reply",
            noTicketsFound: "No client tickets match your search parameters.",

            // Modal - Reply Interface
            replyModalTitle: "Client Reply Interface",
            ticketId: "Ticket ID:",
            clientProfileInfo: "Client Profile Info",
            clientName: "Client Name",
            phoneNumber: "Phone Number",
            dispatchMsgLabel: "Dispatch Communication Message",
            dispatchMsgPlaceholder:
              "Type your response or resolution steps to the client here...",
            cancelBtn: "Cancel",
            sendReplyBtn: "Send Reply",
            alertReplySuccess: "Reply sent to {{clientName}}!",
          },

          // Admin Records
          AdminRecords: {
            pageTitle: "System Records & Events",
            pageDescription:
              "Monitor admin activities, track live runtime exceptions, and audit server and user logs.",
            refreshData: "Refresh Data",
            clearAll: "Clear All",
            exportCSV: "Export Report (CSV)",

            // KPI Cards
            totalRecords: "Total Records",
            storedRecords: "stored logs",
            successfulOps: "Successful Ops",
            stablePerformance: "stable performance",
            runtimeWarnings: "Runtime Warnings",
            warningNotes: "alert notes",
            criticalErrors: "Critical Errors",
            needsAction: "needs action",

            // Search & Filters
            searchPlaceholder:
              "Search by operator, action description, ID, or IP address...",
            allSections: "All Sections",
            allStreams: "All Streams",
            infoLogs: "System Info",
            successLogs: "Successful Ops",
            warningLogs: "Runtime Warnings",
            errorLogs: "Critical Errors",

            // Table Headers
            logId: "Log ID",
            operator: "Operator / Admin",
            actionDetails: "Action Details",
            section: "Section",
            level: "Level",
            timestamp: "Timestamp",
            actions: "Actions",

            // Confirmations & Modals
            deleteConfirm:
              "Are you sure you want to permanently remove this record from the database?",
            clearAllConfirm:
              "Warning: Are you sure you want to clear all stored system logs? This action cannot be undone.",
            deleteLogTooltip: "Delete Log",
            noRecordsTitle: "No Matching Logs Found",
            noRecordsDesc:
              "We couldn't find any logs matching the specified search and filter criteria.",

            // Modal Details
            logDetails: "Log Details",
            operatorTitle: "Responsible Operator:",
            actionDescTitle: "Action Description:",
            ipTitle: "IP Address:",
            timestampTitle: "Timestamp:",
            close: "Close",
          },

          // Admin Settings
          AdminSettings: {
            headerTitle: "System Settings",
            headerSubtitle:
              "Manage your developer profile, site branding, security credentials, and API connections.",
            tabs: {
              profile: "Developer Profile",
              services: "Services & Rates",
              integrations: "API & Integrations",
              security: "Security & Access",
            },
            profileSection: {
              title: "Developer & Site Identity",
              subtitle:
                "Manage your portfolio identity, HTML title, and favicon icon.",
              metaBoxTitle: "Website Metadata (index.html Controls)",
              siteTitleLabel: "Website Title (<title>)",
              siteTitlePlaceholder: "e.g. My Portfolio",
              faviconLabel: "Favicon URL / Path",
              faviconPlaceholder: "/favicon.svg or https://...",
              fullNameLabel: "Full Name",
              professionalTitleLabel: "Professional Title",
              bioLabel: "Short Biography",
              emailLabel: "Public Email",
              websiteLabel: "Personal Website",
              githubLabel: "GitHub Username",
              linkedinLabel: "LinkedIn Profile",
            },
            servicesSection: {
              title: "Services & Rates",
              subtitle:
                "Set your hourly billing defaults and control client-facing availability.",
              availableHireTitle: "Available for New Projects",
              availableHireDesc:
                "Displays 'Open for Work' badge on your public website.",
              maintenanceTitle: "Maintenance Mode",
              maintenanceDesc:
                "Redirect visitors to an under-construction landing page.",
              notificationsTitle: "System Notifications",
              notificationsDesc:
                "Receive immediate alerts when clients pay invoices or send leads.",
            },
            integrationsSection: {
              title: "API & Integrations",
              subtitle:
                "Manage API tokens and third-party developer integrations.",
              stripeLabel: "Stripe Secret Key",
              githubTokenLabel: "GitHub Personal Access Token",
              resendLabel: "Resend API Key",
            },
            securitySection: {
              title: "Security & Access",
              subtitle: "Update your administrator credentials and password.",
              currentPasswordLabel: "Current Password",
              newPasswordLabel: "New Password",
              confirmPasswordLabel: "Confirm New Password",
              passwordPlaceholder: "At least 8 characters",
            },
            saveSuccess: "Settings saved successfully!",
            saving: "Saving...",
            saveChanges: "Save Changes",
          },

          // Admin Settings
          adminSettings: {
            profile: {
              name: "Ahmad Developer",
              title: "Full-Stack Engineer & SaaS Maker",
              bio: "Building high-performance web systems, modern UI/UX, and scalable cloud solutions.",
            },
            services: {
              currency: "USD",
            },
          },
        },

        Client: {
          // client Request
          clientRequest: {
            heroTitle: "Project & Software Development Request",
            heroSubtitle:
              "Fill out the form below to help us accurately understand your requirements and provide the best technical solutions and estimates.",
            steps: {
              services: "Required Services",
              budget: "Budget & Licenses",
              details: "Project Details",
              contact: "Contact Info",
            },
            step1: {
              title: "Select the services you need for your project",
              subtitle:
                "You can select multiple services to get an integrated system.",
              estimatedRange: "Estimated Range",
            },
            step2: {
              title: "Budget & Software Licenses",
              subtitle:
                "Select your allocated budget range and licensing preferences if applicable.",
              budgetLabel: "Allocated Project Budget",
              licenseLabel: "Required License Type for System",
            },
            step3: {
              title: "Project Details & Requirements",
              subtitle:
                "Explain the project concept, desired goals, and main functionalities.",
              descLabel: "Project Description & Core Functionalities *",
              descPlaceholder:
                "Describe your requirements in detail, e.g., We need a payment gateway integration and have an existing system...",
              notesLabel: "Additional Notes or Links (Optional)",
              notesPlaceholder:
                "Figma design links, examples of similar websites...",
            },
            step4: {
              title: "Contact & Organization Info",
              subtitle:
                "We will use this information to send the proposal and get in touch with you.",
              fullName: "Full Name *",
              fullNamePlaceholder: "Enter your full name",
              companyName: "Company / Organization Name",
              companyPlaceholder: "Company or entity name if applicable",
              email: "Email Address *",
              emailPlaceholder: "name@company.com",
              phone: "Phone / WhatsApp *",
              phonePlaceholder: "+968 9000 0000",
              preferredContact: "Preferred Contact Method",
              referralSource: "How did you hear about us?",
            },
            success: {
              title: "Your request has been received successfully!",
              message:
                "Thank you for your interest. Our team will review your request and reach out as soon as possible via your preferred contact method.",
              referenceCode: "Request Reference Code",
              submitAnother: "Submit Another Request",
            },
            buttons: {
              back: "Back",
              next: "Next",
              submit: "Submit Request Now",
            },
          },

          // client Notifications
          notifications: {
            title: "Notifications Center",
            newBadge: "{{count}} new",
            subtitle:
              "View and track all updates regarding your account and projects in real time.",
            markAllRead: "Mark all as read",
            empty: 'No notifications to show in "{{tab}}".',
            pinned: "Pinned",
            pinTooltip: "Pin notification",
            unpinTooltip: "Unpin notification",
            markReadTooltip: "Mark as read",
            markUnreadTooltip: "Mark as unread",
            deleteTooltip: "Delete notification",
            tabs: {
              all: "All",
              unread: "Unread",
              contract: "Contracts",
              invoice: "Invoices",
              support: "Support",
              security: "Security",
              system: "System",
            },
            types: {
              contract: "Contract / Proposal",
              invoice: "Finance / Invoice",
              security: "Security Alert",
              support: "Technical Support",
              system: "System",
            },
          },

          // client Overview
          clientOverview: {
            portalActive: "Client Portal Active",
            welcomeBack: "Welcome Back!",
            subtitle:
              "Track project progress, review milestones, and handle pending billing seamlessly.",
            activeProjects: "Active Projects",
            totalPipeline: "{{count}} total projects in pipeline",
            openInvoices: "Open Invoices",
            actionRequired: "Action required for open payments",
            allCleared: "All invoices cleared",
            totalOutstanding: "Total Outstanding",
            encryptedCheckout: "Secured encrypted checkout supported",
            projectWorkflows: "Project Workflows",
            filterPlaceholder: "Filter projects...",
            filterAll: "All",
            filterInProgress: "In Progress",
            filterCompleted: "Completed",
            budget: "Budget",
            overallProgress: "Overall Progress",
            deliverableChecklist: "Deliverable Checklist",
            targetCompletion: "Target Completion: {{date}}",
            details: "Details",
            noProjects: "No projects match your filter query.",
            pendingFinancials: "Pending Financials",
            invoicesBadge: "INVOICES",
            due: "Due: {{date}}",
            payInvoice: "Pay Invoice",
            paymentSettled: "Payment Settled",
            checkout: "Checkout",
            confirmPayment: "Confirm Payment",
            releasingFunds: "Releasing funds for invoice",
            projectRef: "Project Reference",
            amountDue: "Amount Due",
            confirmPayNow: "Confirm & Pay Now",
            status: {
              in_progress: "In Progress",
              under_review: "Under Review",
              completed: "Completed",
            },
          },

          // Client Projects
          clientProjects: {
            title: "My Projects & Development",
            badgeProjectsCount: "{{count}} Projects",
            subtitle:
              "Track completion stages, task lists, and approved deliverables in detail.",
            stats: {
              activeProjects: "Active Projects",
              completed: "Completed",
              deliverablesCount: "Deliverables Done",
              totalBudget: "Total Investment",
            },
            searchPlaceholder: "Search project name...",
            filterAll: "All Projects",
            filterActive: "Active",
            filterCompleted: "Completed",
            noProjectsFound: "No projects match your search criteria.",
            progressLabel: "Overall Progress",
            startDate: "Start Date",
            estimatedCompletion: "Est. Completion",
            budget: "Budget",
            sections: {
              milestonesAndTasks: "Work Milestones & Detailed Tasks",
              deliverables: "Deliverables Available for Download & Preview",
            },
            status: {
              completed: "Completed",
              in_progress: "In Progress",
              on_hold: "On Hold",
              active: "Active",
              upcoming: "Upcoming",
            },
            taskDueDate: "Due: {{date}}",
            accordionExpand: "Expand details",
            accordionCollapse: "Collapse details",
          },

          //client Bookings
          clientBookings: {
            title: "Consultations & Bookings Log",
            subtitle:
              "Track your scheduled consultation sessions and direct technical interviews",
            stats: {
              total: "Total Bookings",
              confirmed: "Confirmed Sessions",
              pending: "Under Review",
              completed: "Completed Sessions",
            },
            searchPlaceholder: "Search by booking ID or topic...",
            filters: {
              all: "All",
              confirmed: "Confirmed",
              pending: "Pending",
              completed: "Completed",
              cancelled: "Cancelled",
            },
            status: {
              confirmed: "Confirmed",
              pending: "Pending",
              completed: "Completed",
              cancelled: "Cancelled",
            },
            types: {
              saas: "SaaS Design",
              fullstack: "Full-Stack Development",
              architecture: "Software Architecture",
              code_review: "Code Review",
              default: "Technical Consultation",
            },
            time: {
              at: "At",
              oneHour: "1 Hour",
              twoHours: "2 Hours",
            },
            actions: {
              viewDetails: "View Details",
              joinMeeting: "Join Live Meeting",
              cancelBooking: "Cancel This Booking",
              close: "Close",
              joinGoogleMeet: "Join via Google Meet",
            },
            emptyState: {
              title: "No Matching Results",
              desc: "We couldn't find any consultations or bookings matching your search criteria.",
            },
            modal: {
              detailsTitle: "Consultation Subject & Details",
              clientOrOrg: "Client / Organization",
              email: "Email Address",
              scheduledDate: "Scheduled Date",
              timeAndDuration: "Time & Duration",
              adminNotes: "Consultant Notes:",
            },
          },

          //Client Invoices
          ClientInvoices: {
            // Invoices Page
            invoicesTitle: "My Invoices & Payments",
            invoicesSubtitle:
              "View all invoices and financial claims, preview details, download PDFs, and perform online payments directly.",
            printReport: "Print Report",

            // KPIs
            totalSpent: "Total Paid",
            paidSuccessfully: "Successfully Settled",
            pendingAmount: "Pending Amount",
            requiresAction: "Requires Action Soon",
            overdueAmount: "Overdue Invoices",
            followUpToday: "Please Follow Up Today",
            totalInvoicesCount: "Total Invoices Count",
            recordedDocuments: "Recorded Financial Documents",

            // Controls & Filters
            searchPlaceholder: "Search by invoice number or project title...",
            filterAll: "All",
            filterPaid: "Paid",
            filterPending: "Pending",
            filterOverdue: "Overdue",
            gridView: "Grid View",
            listView: "List View",

            // Status Badges
            statusPaid: "Paid",
            statusPending: "Pending",
            statusOverdue: "Overdue",

            // Card / Table Labels
            issueDate: "Issue Date",
            dueDate: "Due Date",
            paidDateLabel: "Paid Date",
            previewDetails: "Preview Details",
            payNow: "Pay Now",
            download: "Download",
            invoiceNumber: "Invoice #",
            projectDescription: "Project / Description",
            amount: "Amount",
            status: "Status",
            actions: "Actions",
            noInvoicesFound: "No Matching Invoices Found",
            tryChangingSearch:
              "Try changing search terms or filter buttons above.",

            // Details Modal
            invoiceDetails: "Invoice Details",
            totalAmount: "Total Amount",
            billedTo: "Billed To:",
            invoiceInfo: "Invoice Details:",
            project: "Project:",
            servicesBreakdown: "Services & Items Breakdown",
            itemDescription: "Description",
            itemQty: "Qty",
            itemUnitPrice: "Unit Price",
            itemTotal: "Total",
            notesAndTerms: "Notes & Terms:",
            printInvoice: "Print Invoice",
            proceedToPayment: "Proceed to Payment",
            close: "Close",

            // Payment Modal
            payInvoice: "Pay Invoice",
            amountToPay: "Amount Due to Pay",
            cardholderName: "Cardholder Name",
            cardNumber: "Card Number",
            expiryDate: "Expiry Date",
            cvcCode: "CVC",
            paying: "Processing...",
            paymentSuccessTitle: "Payment Successful!",
            paymentSuccessMessage:
              "Invoice {{number}} has been successfully settled and account balance updated.",
            today: "Today",
            creditCardMethod: "Credit Card (MADA / Visa)",
          },

          //Client Proposals
          proposals: {
            title: "Client Portal & Digital Agreements",
            subtitle:
              "Review commercial terms, technical scope, and sign official contracts digitally.",
            securityProtocol: "Security Protocol",
            securityEncrypt: "256-Bit Encrypted E-Sign",
            searchPlaceholder: "Search proposals & contracts...",
            filterAll: "All Documents",
            filterPending: "Awaiting Action",
            filterAccepted: "Accepted & Signed",
            filterExpired: "Expired",
            noDocuments: "No documents available.",
            selectDocumentPrompt:
              "Select a document from the list to view complete agreement details.",
            issuedOn: "Issued on",
            project: "Project:",
            downloadPdf: "Download PDF",
            signDocumentNow: "Sign Document Now",
            legallySignedTitle: "Legally Accepted & Digitally Signed",
            signedByOn: "Signed by {{name}} on {{date}}",
            totalInvestmentValue: "Total Investment Value",
            validityExpiration: "Validity Expiration",
            validUntil: "Valid: {{date}}",
            technicalScope: "Technical Scope of Work",
            deliverablesAndMilestones: "Deliverables & Milestones",
            milestoneSchedule: "Payment Milestone Schedule",
            milestoneTitle: "Milestone Title",
            ratio: "Ratio",
            amount: "Amount",
            dueDate: "Due Date",
            termsAndConditions: "Terms & Conditions",

            // Statuses
            statusSignedActive: "Signed & Active",
            statusActionRequired: "Action Required",
            statusDeclined: "Declined",
            statusExpired: "Expired",

            // E-Sign Modal
            signModalTitle: "Digital E-Signature Pad",
            signerNameLabel: "Full Legal Signer Name *",
            signerNamePlaceholder: "e.g. Sarah Jenkins",
            drawSignatureLabel: "Draw Your Signature *",
            clearPad: "Clear Pad",
            eSignLegalNotice:
              'By clicking "Accept & Sign Agreement", you agree that this electronic signature is legally binding under international digital contract regulations.',
            cancel: "Cancel",
            acceptAndSign: "Accept & Sign Agreement",
          },

          // Client Support & Revisions
          clientSupport: {
            pageTitle: "Support & Revisions",
            pageSubtitle:
              "Need a layout change, discovered a bug, or have general questions? Open a ticket below.",
            createNewRequest: "Create New Request",
            requestType: "Request Type",
            types: {
              bug: "🐞 Bug",
              revision: "🛠️ Edit",
              question: "❓ Ask",
            },
            targetProject: "Target Project",
            targetProjectPlaceholder: "e.g. Brand E-Commerce App",
            subjectSummary: "Subject Summary",
            subjectPlaceholder: "Brief title of your edit or question",
            detailedDescription: "Detailed Description",
            descriptionPlaceholder:
              "Describe exactly what needs adjustment. Include references or step-by-step reproduction if it is a bug.",
            priorityLevel: "Priority Level",
            submitTicket: "Submit Ticket",
            submittedTicketsTitle: "Your Submitted Tickets",
            totalTickets: "{{count}} Total",
            priorities: {
              low: "Low Priority",
              medium: "Medium Priority",
              high: "High Priority",
            },
            statuses: {
              pending: "Pending",
              in_progress: "In Progress",
              resolved: "Resolved",
            },
            currentClient: "Current Client",
            today: "Today",
          },

          // Client Settings
          clientSettings: {
            pageTitle: "Account & Profile Settings",
            pageSubtitle:
              "Manage your personal information and account preferences.",
            saveSuccess: "Saved successfully!",
            bioOverview: "Bio Overview",
            joinedDate: "Joined",

            // Navigation Tabs
            tabProfile: "Edit Profile",
            tabNotifications: "Notifications & Alerts",
            tabSecurity: "Security & Account",

            // Profile Form
            fullName: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            jobTitle: "Job Title",
            companyName: "Company Name",
            city: "City",
            bio: "Bio / Summary",

            // Notifications Options
            notificationsTitle: "Notification Preferences",
            emailAlerts: "Email Alerts",
            smsAlerts: "SMS Alerts",
            projectUpdates: "Project Updates",
            invoiceReminders: "Invoice & Payment Reminders",
            marketingEmails: "Marketing & Newsletter Emails",

            // Security Options
            securityTitle: "Security & Protection Settings",
            twoFactorAuth: "Two-Factor Authentication (2FA)",
            loginAlerts: "Login Alerts",

            // Buttons
            saveChanges: "Save Changes",
          },
        },
      },

      Data: {
        businessData: {
          clients: {
            alex: {
              name: "Alex Morgan",
              company: "Apex Commerce Inc.",
              jobTitle: "Chief Technology Officer (CTO)",
              bio: "Software engineer passionate about building high-performance cloud platforms and modern software development.",
              address: {
                street: "42 Tech Street, Tech Park",
                city: "Riyadh",
                country: "Saudi Arabia",
              },
            },
            sami: {
              name: "Sami Al-Mansour",
              company: "Al-Mansour Creative Designs",
              jobTitle: "Creative Director",
              bio: "Visual identity designer and UX expert with over 8 years of experience.",
              address: {
                street: "Olaya Street",
                city: "Riyadh",
                country: "Saudi Arabia",
              },
            },
            sara: {
              name: "Sara Al-Ahmad",
              company: "Vanguard Smart Solutions",
              jobTitle: "Procurement Manager",
              bio: "Managing digital transformation partnerships and Enterprise software analysis.",
              address: {
                street: "Emirates Towers",
                city: "Dubai",
                country: "UAE",
              },
            },
          },
          projects: {
            prj301: {
              name: "Advanced E-Commerce Platform",
              description:
                "Developing an integrated e-commerce platform based on Headless Architecture using React, Tailwind, and Next.js with a smart payment system.",
              m1: {
                title: "UI/UX Design & Planning",
                t1: "Approve final interactive prototype on Figma",
                t2: "Map user flow and fast checkout process",
                t3: "Test mobile usability",
              },
              m2: {
                title: "Frontend Development & Cloud Integration",
                t4: "Develop catalog, cart, and dashboard pages",
                t5: "Apply glassmorphic dark mode and notification system",
                t6: "Integrate Stripe and Apple Pay gateways",
                t7: "Connect live inventory APIs",
              },
              m3: {
                title: "Security Testing & Official Launch",
                t8: "Vulnerability scan and server response audit",
                t9: "Deploy to production domain and migrate data",
              },
              deliv1: "Full Figma Design System",
              deliv2: "V1.4 Live Preview",
              deliv3: "API Docs & Technical Guide",
            },
            prj302: {
              name: "Brand Identity Development",
              description:
                "Full visual identity development for logo, brand guidelines, and corporate stationery.",
              m101: {
                title: "Company Logo & Guidelines",
                t101: "Deliver print-ready and web logo files",
              },
              deliv1: "Brand Guidelines PDF",
              deliv2: "Logo Assets & Vector Pack",
            },
          },
          invoices: {
            inv501: {
              projectTitle: "E-Commerce Platform - API Integration",
              item1: "Stripe & Apple Pay Integration",
              item2: "GraphQL APIs Development & Server Response",
              notes:
                "Please transfer the amount before the due date to avoid service suspension.",
            },
            inv502: {
              projectTitle: "E-Commerce Platform - Phase 1 (UI/UX)",
              item3: "Figma UI/UX Interactive Prototype Design",
              item4: "UX Testing & Mobile Samples",
              notes:
                "Payment received in full. Thank you for doing business with us.",
            },
            inv503: {
              projectTitle: "Security Consultation & Server Audit",
              item5: "API Security Check & Session Encryption",
              notes:
                "Overdue invoice. Please follow up and settle the payment as soon as possible.",
            },
            inv504: {
              projectTitle: "Brand Identity Design",
              item6: "Brand Identity Design & Brand Guidelines",
            },
            paymentMethods: {
              applePay: "Credit Card (Apple Pay)",
              bankTransfer: "Direct Bank Transfer",
              online: "Direct Electronic Payment",
            },
          },
          notifications: {
            notif101: {
              title: "Web App Contract Ready for Signing",
              message:
                "The final updated contract has been sent by the team. Please review and e-sign to begin production.",
              actionText: "Review Contract",
            },
            notif102: {
              title: "Payment Confirmed for Invoice #INV-2026-002",
              message:
                "We have received your payment of $3,200.00. Payment receipt attached to your account.",
              actionText: "View Invoice",
            },
            notif103: {
              title: "New Dashboard Update (Version 2.4)",
              message:
                "Added tab bar system and activity log to enhance your browsing experience.",
            },
            notif104: {
              title: "Security Alert: New Login",
              message:
                "New login to your account detected from a macOS device in Dubai, UAE.",
              actionText: "Security Settings",
            },
            notif105: {
              title: "Support Ticket Replied #SUP-889",
              message:
                "Support engineer added a new response regarding your API integration inquiry.",
              actionText: "View Ticket",
            },
            time: {
              minsAgo: "10 minutes ago",
              hoursAgo: "2 hours ago",
              yesterday: "Yesterday, 04:30 PM",
              daysAgo: "2 days ago",
              threeDaysAgo: "3 days ago",
              today: "Today",
            },
          },
        },

        centralData: {
          client: {
            fullName: "Alex Morgan",
            jobTitle: "Chief Technology Officer (CTO)",
            companyName: "Apex Commerce Ltd.",
            bio: "Software Engineer passionate about building high-performance cloud platforms. Currently scaling infrastructure for digital commerce.",
            joinedDate: "January 15, 2026",
            address: {
              street: "42 Tech Street, Tech Hub",
              city: "Riyadh",
              country: "Saudi Arabia",
              zipCode: "12211",
            },
          },
          projects: {
            proj701: {
              name: "Advanced E-Commerce App",
              description:
                "Integrated e-commerce platform based on Headless Architecture with React, Tailwind, and Django.",
              startDate: "June 1, 2026",
              estimatedCompletion: "August 15, 2026",
              milestones: {
                m1Title: "UI/UX Design",
                t1Title: "Approve interactive prototype on Figma",
                t2Title: "Map user flow and checkout process",
                m2Title: "Frontend Development (React/Tailwind)",
                t3Title: "Home, gallery, and cart pages",
                t4Title: "Implement dark mode for dashboard",
                t5Title: "Integrate payment gateways",
              },
              deliverables: {
                d1Name: "Figma Design System",
                d2Name: "Preview Version V1",
              },
            },
            proj502: {
              name: "Corporate Portal Update",
              description:
                "Enhancing the corporate website to boost page load speed and improve SEO.",
              startDate: "May 10, 2026",
              estimatedCompletion: "July 10, 2026",
              deliverables: {
                d1Name: "Live Site URL",
              },
            },
          },
          invoices: {
            inv201: {
              projectTitle: "API & SaaS Integrations",
              issuedDate: "July 10, 2026",
              dueDate: "July 28, 2026",
            },
            inv194: {
              projectTitle: "E-Commerce Application (Phase 1)",
              issuedDate: "June 15, 2026",
              dueDate: "June 30, 2026",
            },
          },
        },

        clientData: {
          fullName: "Ahmed Mahmoud",
          companyName: "Innovative Tech Co.",
          jobTitle: "Project Manager",
          bio: "Digital solutions developer and designer with over 8 years of experience in managing tech projects.",
          address: {
            street: "King Fahd Road",
            city: "Riyadh",
            country: "Saudi Arabia",
            zipCode: "12211",
          },
        },

        dataStore: {
          services: {
            fullstack: {
              label: "Full-Stack Web Application Development",
              desc: "Comprehensive custom software solutions built from scratch using React, Django, and advanced databases.",
            },
            saas: {
              label: "SaaS & Dashboard UI/UX Design",
              desc: "Ultra-smooth UI/UX design featuring responsive and interactive control dashboards.",
            },
            project_trial: {
              label: "Software Project Trial Request",
              desc: "Opportunity to test and evaluate software solutions prior to final adoption.",
            },
            frontend: {
              label: "Frontend Web Development (React & TypeScript)",
              desc: "Building modern, ultra-fast interfaces with exceptional performance and SEO optimization.",
            },
            backend: {
              label: "Backend Systems Development (Python & Django)",
              desc: "Constructing secure and scalable server architectures with complex API integrations.",
            },
          },
          days: {
            sunday: "Sunday",
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday",
            thursday: "Thursday",
            friday: "Friday",
            saturday: "Saturday",
          },
          contactMethods: {
            email: "Email",
            whatsapp: "WhatsApp",
            phone: "Phone Call",
          },
          referralSources: {
            google: "Search Engines (Google)",
            social: "Social Media (LinkedIn/X)",
            recommendation: "Client or Friend Recommendation",
            portfolio: "Portfolio & Tech Platforms",
            other: "Other",
          },
          consultationTypes: {
            saas: "SaaS Systems",
            fullstack: "Full-Stack Development",
            architecture: "System Architecture",
            code_review: "Code Review & Performance",
            other: "Other Consultations",
          },
          initialLeads: {
            "LD-9021": {
              fullName: "Salim Al-Maamari",
              companyName: "TechCorp Solutions",
              licenseType: "Enterprise Lifetime License",
              description:
                "Looking for a custom software solution for invoice and client management with support for project grouping and real-time notifications.",
              additionalNotes: "Please contact during morning hours only.",
              notes: {
                "note-1":
                  "Initial request reviewed, dynamic price quote will be sent soon.",
              },
            },
            "LD-9022": {
              fullName: "Ahmed Al-Farsi",
              companyName: "Digital Space Studio",
              description:
                "Requesting UI/UX review and modernization for current cloud interface to support glassmorphism and modern UI trends.",
            },
          },
          initialDemoRequests: {
            "DM-3001": {
              fullName: "Fahad Al-Amri",
              companyName: "Omani Tech Corp",
              productOrService: "Cloud ERP System",
              notes:
                "We have 50 employees and want a trial for the HR and Financial modules.",
            },
            "DM-3002": {
              fullName: "Asma Al-Rasbi",
              companyName: "Hospitality Group",
              productOrService: "Bookings Dashboard",
              notes:
                "We want to test the sandbox demo to integrate with our existing systems.",
            },
          },
          initialActivityLogs: {
            "LOG-9081": {
              operator: "Ali Al-Mahrooqi",
              action:
                "Updated system licensing settings and upgraded package to Enterprise.",
            },
            "LOG-9082": {
              operator: "System Core Guard",
              action:
                "Repeated suspicious login attempt blocked automatically.",
            },
            "LOG-9083": {
              operator: "Said Al-Siyabi",
              action:
                "Failed to sync secondary database with primary server (DB Connection Timeout).",
            },
            "LOG-9084": {
              operator: "Ahmed Al-Farsi",
              action: "Exported financial report for August 2026 as PDF.",
            },
            "LOG-9085": {
              operator: "System CronJob",
              action: "Routine system cache cleanup executed successfully.",
            },
          },
          initialBookings: {
            "BK-1001": {
              nameOrOrg: "Smart Solutions Co. / Ali Al-Mahrooqi",
              summary:
                "Architecture consultation session for SaaS frontend, database schema, and future scalability requirements.",
              adminNotes: "Google Meet link sent and final time confirmed.",
            },
            "BK-1002": {
              nameOrOrg: "Modern Tech Est. / Said Al-Siyabi",
              summary:
                "Technical consultation on optimizing React frontend performance and smooth integration with Django backend.",
            },
            "BK-1003": {
              nameOrOrg: "Digital Horizon Co.",
              summary:
                "Reviewing timeline and estimated costs for developing a custom e-commerce platform.",
            },
            "BK-1004": {
              nameOrOrg: "Tech Innovation Est.",
              summary:
                "Reviewing initial designs for live dashboard and exploring UI/UX enhancements.",
              adminNotes:
                "Session completed successfully and recommendations PDF provided.",
            },
            "BK-1005": {
              nameOrOrg: "Smart Cloud Solutions",
              summary:
                "Cancellation and rescheduling request regarding cloud server architecture consultation.",
            },
          },
        },

        portfolioItems: {
          tags: {
            premiumTemplate: "Premium Template",
            aiIntegration: "AI Integration",
            fintechTemplate: "FinTech Template",
            adminAnalytics: "Admin & Analytics",
          },
          items: {
            "1": {
              title: "React SaaS Template",
              version: "(2026 Edition) - High Performance",
              description:
                "A premium React SaaS landing page template designed for software companies and startups. Featuring responsive layouts, Dark-themed design, SEO optimization, and high performance.",
            },
            "2": {
              title: "AI Dashboard Platform",
              version: "(2026 Edition) - Core Tech",
              description:
                "An advanced administrative dashboard featuring AI-powered assistants, smart automated charting, and ultra-fast rendering.",
            },
            "3": {
              title: "Financial Analytics Pro",
              version: "(2026 Edition) - Enterprise",
              description:
                "High-tier financial accounting dashboard designed for global secure transactions, live invoicing, data filters, and multi-currency metrics tracking.",
            },
            "4": {
              title: "ALHUSSAIN Premium Dashboard Template",
              version: "(2026 Edition) - Enterprise",
              description:
                "A high-performance, dark-themed admin dashboard template engineered for modern SaaS backends, CRM systems, and data analytics. Equipped with responsive charts, dynamic data tables, financial tracking layouts, and fluid animations to accelerate your software's control panel development.",
            },
          },
        },

        // --- Testimonials Translations ---
        testimonialsItems: {
          "TEST-101": {
            role: "CTO",
            content:
              "The AI Dashboard component transformed our backend metrics visibility within days. The attention to UI details and clean code architecture is outstanding.",
          },
          "TEST-102": {
            role: "Product Director",
            content:
              "Incredible dark-theme architecture with seamless responsive features. Reduced our interface integration timeline by more than half.",
          },
          "TEST-103": {
            role: "Lead Engineer",
            content:
              "The Glassmorphism design and micro-interactions make this template feel incredibly high-end. Highly recommended for modern SaaS products.",
          },
        },

        // Project Details
        proposalsData: {
          statuses: {
            draft: "Draft",
            pending: "Pending",
            accepted: "Accepted",
            declined: "Declined",
            expired: "Expired",
          },
          documentTypes: {
            proposal: "Proposal",
            contract: "Contract",
          },
          items: {
            "PROP-2026-001": {
              title: "E-Commerce Platform & Admin Dashboard Suite",
              projectTitle: "Enterprise Retail Management System",
              companyName: "Advanced Solutions Co.",
              scopeOfWork: [
                "Design dark-themed, ultra-high-performance interfaces using React, TypeScript, and Tailwind CSS.",
                "Develop a real-time admin dashboard with advanced analytics and KPI metrics.",
                "Implement a self-service customer portal for project tracking, automated billing, and e-signatures.",
                "Integrate a scalable backend infrastructure using Django REST Framework with PostgreSQL and Redis.",
              ],
              deliverables: [
                "Production-ready codebase repository on GitHub Enterprise containing React and Django.",
                "CI/CD deployment pipeline setup, SSL integration, and AWS cloud infrastructure configuration.",
                "Comprehensive OpenAPI documentation and end-user guide manuals.",
              ],
              milestones: {
                m1: "Upfront Deposit for Project Assurance",
                m2: "Phase 1 Delivery of Core Admin Dashboard",
                m3: "Final Handover & Full Launch",
              },
              paymentTerms:
                "40% upfront deposit upon digital signing, 30% after Phase 1 delivery, and 30% upon final launch.",
              notes:
                "Includes 6 months of premium post-launch technical support, 24/7 server monitoring, and free bug fixes.",
              activityLogs: {
                l1: "Document created and converted to draft",
                l2: "Document issued and sent to the client",
                l3: "Document viewed by the client",
              },
            },
            "CNT-2026-002": {
              title: "High-Density App & Database Performance Optimization",
              projectTitle: "Backend Infrastructure Upgrade & Optimization",
              companyName: "Nexa Design International",
              scopeOfWork: [
                "Optimize complex Django ORM queries and resolve N+1 performance bottlenecks.",
                "Implement Edge Caching via CDN networks and asset compression pipelines.",
                "Achieve a score of 95+ on Google Lighthouse and reduce First Contentful Paint to under 0.8s.",
              ],
              deliverables: [
                "Interactive performance audit reports (comparing before and after optimization).",
                "Direct code integration into production with zero-downtime index applications.",
              ],
              milestones: {
                m1: "Comprehensive Performance Audit & Final Tuning",
              },
              paymentTerms:
                "100% payment upon successful execution and delivery of verified audit reports.",
              activityLogs: {
                l1: "Contract draft created",
                l2: "Contract digitally signed",
              },
            },
            "PROP-2026-003": {
              title: "Mobile App for Real-Time Alerts & Notifications",
              projectTitle: "Logistics Notification Engine App",
              companyName: "Veloci Logistics",
              scopeOfWork: [
                "Architect cross-platform app interfaces using React Native and Expo.",
                "Integrate WebSockets for instant push alerts and live tracking.",
              ],
              deliverables: [
                "Deployment-ready builds for App Store and Google Play (.APK & .IPA).",
              ],
              paymentTerms:
                "50% upfront deposit to commence development operations.",
              activityLogs: {
                l1: "Proposal issued",
                l2: "Proposal automatically expired",
              },
            },
          },
          storeLogs: {
            statusUpdated: "Status updated to {{status}}",
            byUser: " by {{user}}",
            documentCreated: "Document created",
            defaultUser: "System / Admin",
          },
        },

        support: {
          filters: {
            all: "All Category Types",
            revision: "Scope Revisions",
            bug: "System Bugs",
            question: "Client Inquiries",
          },
          priorities: {
            low: "Low - Flexible timeline",
            medium: "Medium - Standard response",
            high: "High - Blocks testing/production",
          },
          statuses: {
            pending: "Pending",
            in_progress: "In Progress",
            resolved: "Resolved",
          },
          tickets: {
            tk402: {
              subject: "Change checkout button gradient color",
              description:
                "We need the primary checkout button to match our updated brand guidelines (emerald gradient instead of indigo).",
            },
            tk391: {
              subject: "Webhook failing under specific payload",
              description:
                "The API throws a 500 error whenever the metadata payload contains nested array elements. Needs urgent debug.",
            },
            tk310: {
              subject: "Inquiry about domain transfer timeline",
              description:
                "How long does the DNS propagation typically take for the new redirect settings?",
            },
          },
        },
      },
    },
  },
  ar: {
    translation: {
      pages: {
        // Header
        Header: {
          navProjects: "المشاريع",
          navServices: "الخدمات",
          navContact: "تواصل معنا",
          login: "تسجيل الدخول",
          switchLanguage: "English",
        },

        // Footer
        Footer: {
          footerTitle: "أخبرني عن مشروعك الإبداعي القادم",
          footerSubtitle:
            "لنعلم معاً على إنشاء تجارب رقمية جذابة تتفاعل مع الجمهور وتحقق تفاعلاً قيمًا لعلامتك التجارية عبر مختلف المنصات.",
          footerContactBtn: "تواصل معي",
          footerProjectsBtn: "شاهد مشاريعي",
          footerCopyright:
            "جميع الحقوق محفوظة © 2026 الحسين العقدة الذكية [ASN].",
          footerOmaniPassion: "صُنع بشغف عُماني",
        },

        // Hero
        Hero: {
          heroTitleLine1: "تحويل أفكارك الرقمية",
          heroTitleLine2: "إلى واقع ملموس",
          heroDescription:
            "مرحباً بك في منصة الحسين العقدة الذكية، حيث أجمع بين الإبداع الفني والدقة البرمجية لبناء موقع إلكتروني متميز يلبي تطلعاتك ويحقق أهدافك الفريدة.",
          heroTalkToMe: "تحدث معي",
          heroViewMyWork: "شاهد أعمالي",
        },

        // About Me
        AboutMe: {
          aboutAvailable: "متاح للعمل",
          aboutBasedIn: "// مقيم في سلطنة عُمان",
          aboutTitle: "أنا الحسين، شغوف بالتميز الرقمي والابتكار البرمجي.",
          aboutBio1:
            "أنا لست مجرد مطور ويب؛ بل شريكك في النجاح الرقمي. أؤمن أن كل مشروع هو قصة فريدة، وأسعى لسرد قصتك من خلال تصميمات مخصصة وأكواد برمجية قوية. الابتكار، الجودة، ورضا العميل هي أولوياي القصوى، لضمان حصولك على حلول رقمية تستمر وتتطور معك.",
          aboutBio2:
            "أهتم بأدق التفاصيل — من الفكرة الأولى وحتى الإطلاق النهائي — لضمان تجربة مستخدم استثنائية تعزز حضورك الرقمي وتحقق نتائج ملموسة.",
          aboutRoleTag: "مصمم واجهات وتجارب المستخدم UI/UX",
          aboutDiscoverServices: "استكشف خدماتي",
          aboutSkillsExpertise: "الخبرات والمهارات",
          aboutSkillsCore: "المهارات الأساسية",
          aboutLiveCoding: "محاكاة البرمجة المباشرة",
          aboutOutputLabel: "المُخرجات",
          productDesign: "تصميم المنتجات",
          uxDesign: "تصميم تجربة المستخدم",
          uiDesign: "تصميم واجهة المستخدم",
          interactionDesign: "تصميم التفاعل",
          webflow: "Webflow",
          uxResearch: "أبحاث تجربة المستخدم",
          framer: "Framer",
          branding: "الهوية البصرية",
          smart: "ذكاء وتطوير",
          noCode: "بدون كود (No-Code)",
          thinker: "تفكير إستراتيجي",
          motionDesign: "التصميم المتحرك",
          designSystems: "أنظمة التصميم",
          prototyping: "بناء النماذج الأولية",
          accessibility: "إمكانية الوصول",
          creativeCoding: "البرمجة الإبداعية",
        },

        // FAQ Section
        faq: {
          badge: "الأسئلة الشائعة",
          title: "أسئلة؟ لدينا الإجابات!",
          subtitle:
            "اعثر على إجابات سريعة لأكثر الأسئلة شيوعاً حول الخدمات المقدمة.",
          q1: "ما هي الخدمات التي تقدمها؟",
          a1: "أنا متخصص في تصميم المواقع، الهوية البصرية، تصميم واجهات وتجارب المستخدم UI/UX، وتطوير Framer، لإنشاء تجارب حديثة وسهلة الاستخدام مصممة خصيصاً لتلبية احتياجاتك.",
          q2: "هل تقدم خدمة التعديلات؟",
          a2: "نعم، أقدم جولات متعددة من التعديلات لضمان توافق التصميم النهائي بشكل مثالي مع توقعاتك وأهداف عملك.",
          q3: "هل هناك حد لعدد الطلبات التي يمكنني تقديمها؟",
          a3: "بالتأكيد لا! عندما نقول غير محدود، فنحن نعني ذلك حقاً. بمجرد الاشتراك، يمكنك إضافة أي عدد تريد من طلبات التصميم إلى قائمة الانتظار وسيتم تسليمها واحداً تلو الآخر.",
          q4: "كيف أبدأ العمل معك؟",
          a4: "يمكنك البدء بالتواصل عبر نموذج الاتصال أو حجز مكالمة استكشافية. سنناقش نطاق مشروعك، والجدول الزمني، والأهداف.",
          q5: "ما هو هيكل الأسعار لديك؟",
          a5: "تعتمد الأسعار كلياً على تعقيد المشروع، والمميزات، والجدول الزمني. أقدم أسعاراً ثابتة وشفافة قائمة على القيمة بعد استشارتنا الأولية.",
          q6: "كم من الوقت يستغرق المشروع؟",
          a6: "في المتوسط، يتم إنجاز معظم الطلبات خلال 2-3 أيام. ومع ذلك، قد تستغرق الطلبات الأكثر تعقيداً وقتاً أطول.",
        },

        // Services Section
        services: {
          badge: "ماذا أقدم؟",
          title: "حلول رقمية متكاملة لنمو عملك",
          subtitle:
            "من التصميم الجذاب وحتى التطوير القوي، نقدم مجموعة واسعة من الخدمات الرقمية التي تغطي جميع احتياجاتك، مما يساعدك على التميز في السوق الرقمي المزدحم وتحقيق النجاح المستدام.",
          showMore: "شاهد المزيد من الخدمات",
          showLess: "عرض خدمات أقل",
          items: {
            uiuxTitle: "تصميم واجهة المستخدم/التجربة",
            uiuxSubtitle: "(UI/UX)",
            uiuxDesc:
              "نخلق تجارب مستخدم سهلة، جذابة، وبديهية، تضمن وصول رسالتك بوضوح.",
            frontendTitle: "تطوير واجهة الويب",
            frontendSubtitle: "(Front-end)",
            frontendDesc:
              "نحول التصميمات إلى كود نظيف، متجاوب، وسريع باستخدام React و TypeScript.",
            projectManagementTitle: "إدارة مشاريع برمجية",
            projectManagementDesc:
              "نقود فريق التطوير لديك نحو النجاح، مع التركيز على الجودة والمواعيد النهائية.",
            performanceTitle: "تحسين أداء المواقع",
            performanceDesc:
              "نجعل موقعك سريعاً جداً، متوافقاً مع محركات البحث، وجاهزاً للانطلاق.",
            backendTitle: "تطوير الأنظمة الخلفية",
            backendSubtitle: "(Back-end)",
            backendDesc:
              "نبني خوادم قوية وقواعد بيانات آمنة وسريعة تضمن استقرار تطبيقك.",
            seoTitle: "تهيئة محركات البحث",
            seoSubtitle: "(SEO)",
            seoDesc:
              "نساعد موقعك على التصدر في نتائج البحث الأولى لزيادة الزوار بشكل طبيعي.",
            devopsTitle: "الحوسبة السحابية و DevOps",
            devopsDesc:
              "نرفع مشروعك على أفضل الخوادم السحابية ونوفر نظام حماية ومراقبة مستمر.",
            cybersecurityTitle: "الأمن السيبراني وحماية البيانات",
            cybersecurityDesc:
              "نطبق أفضل معايير الأمان لحماية بيانات مستخدميك ومقاومة الثغرات البرمجية.",
          },
        },

        // AuthPage
        auth: {
          home: "الرئيسية",
          signedOutTitle: "تم تسجيل الخروج",
          signedOutDesc:
            "لقد تم تسجيل خروجك بنجاح وآمان من حسابك. شكرًا لاستخدامك منصة ASN!",
          redirectingIn: "إعادة التوجيه للرئيسية خلال",
          seconds: "ثوانٍ...",
          goToHomepage: "الذهاب للرئيسية",
          or: "أو",
          signBackIn: "تسجيل الدخول مجدداً",
          signInTitle: "تسجيل الدخول إلى ASN",
          signUpTitle: "إنشاء حساب جديد",
          fullName: "الاسم الكامل",
          fullNamePlaceholder: "محمد أحمد",
          email: "البريد الإلكتروني",
          emailPlaceholder: "name@work-email.com",
          password: "كلمة المرور",
          passwordPlaceholder: "••••••••",
          logInBtn: "تسجيل الدخول",
          signUpBtn: "إنشاء الحساب",
          devNote: "أزرار محاكاة للتطوير والاختبار بدون الاتصال بالخلفية:",
          loginAdmin: "دخول كـ مسؤول",
          loginClient: "دخول كـ عميل",
          googleSignIn: "تسجيل الدخول بواسطة Google",
          googleSignUp: "إنشاء حساب بواسطة Google",
          githubSignIn: "تسجيل الدخول بواسطة GitHub",
          githubSignUp: "إنشاء حساب بواسطة GitHub",
          dontHaveAccount: "ليس لديك حساب؟",
          alreadyHaveAccount: "لديك حساب بالفعل؟",
          signUpLink: "إنشاء حساب",
          logInLink: "تسجيل الدخول",
          copyright: "الحسين العقدة الذكية © {{year}}",
        },

        // Portfolio
        portfolio: {
          badge: "ابتكاراتي",
          title: "تصميم النجاح",
          description:
            "أعرض هنا مجموعة مختارة من المشاريع والحلول الرقمية التي قمت بتطويرها بشغف ودقة.",
          trustedBy: "يحظى بثقة أكثر من {{count}} متابع حول العالم",
          contactMe: "تواصل معي",
          categories: {
            all: "الكل",
            web: "تطوير الويب",
            design: "التصاميم والهوية",
          },
          projectCategories: {
            web: "تطوير الويب",
            design: "الهوية البصرية / التصميم",
          },
        },

        // project Details
        projectDetails: {
          backToPortfolio: "العودة للمعرض",
          responsiveDesign: "تصميم متجاوب",
          seoOptimized: "محسن لمحركات البحث",
          saasReady: "جاهز للـ SaaS",
          tryLiveDemo: "تجربة المعاينة المباشرة",
          chooseLicense: "اختر الترخيص المناسب",
          popularBadge: "الأكثر طلباً",
          addToCart: "إضافة إلى السلة",
          mainFeaturesTitle: "ميزات القالب الرئيسي",
          technicalSpecsTitle: "المواصفات الفنية للمنتج",
          relatedProjectsTitle: "مشاريع ذات صلة",
          viewMore: "عرض الكل",
          features: {
            saasReadyTitle: "جاهز للبرمجيات كخدمة (SaaS Ready)",
            saasReadyDesc:
              "يتضمن هذا القالب وظائف جاهزة ومكونات واجهة مستخدم مخصصة للـ SaaS لتسريع الإطلاق.",
            seoTitle: "مُحسن لمحركات البحث (SEO)",
            seoDesc:
              "مبني بأحدث معايير الأرشفة السريعة وضمان تصدر محركات البحث تلقائياً.",
            responsiveTitle: "سريع الاستجابة ومتجاوب",
            responsiveDesc:
              "أداء خارق وتجاوب كامل ومطلق مع كافة الشاشات وهواتف المستخدمين.",
          },
          specs: {
            designFrameworks: "التصميم والأطر",
            reactVersion: "إصدار الـ React",
            supportUpdates: "الدعم والتحديثات",
            programmingLanguage: "لغة البرمجة",
            supportedDevices: "الأجهزة المدعومة",
            environmentState: "حالة البيئة",
            lifetimeIncluded: "مدى الحياة مشمول",
            fullTypescriptSupport: "TypeScript دعم كامل",
            devicesValue: "جوال، تابلت، حاسوب",
            productionReady: "جاهز للإنتاج فوراً",
          },
          licenses: {
            commercial: "ترخيص تجاري",
            commercialDesc: "وصول تجاري كامل مع الكود المصدري",
            personal: "ترخيص شخصي (غير تجاري)",
            personalDesc: "استخدام لمشروع شخصي واحد فقط",
          },
        },

        // Contact
        contact: {
          heroTitle: "تواصل معي لبناء مشروع",
          heroTitleHighlight: "استثنائي",
          heroDesc:
            "احجز جلسة استشارية متخصصة لمناقشة أفكارك وبنيتك البرمجية، أو قم بطلب خدمة مخصصة مع الميزانية والتفاصيل المناسبة لك.",
          tabConsultation: "حجز استشارة تقنية",
          tabInquiry: "طلب خدمة / مشروع",
          consultationTitle: "جلسة استشارية تقنية مخصصة",
          consultationDesc:
            "أساعدك في تحليل متطلبات مشروعك، اختيار التقنيات الأنسب (Tech Stack)، مراجعة معماريّة واجهات المستخدم UI/UX لبرامج الويب أو SaaS، ووضع خطة تنفيذية واضحة تضمن أداءً عالياً وقابلية للتوسع.",
          step1Consultation: "1. بيانات طلب الاستشارة",
          nameOrOrg: "اسمك أو اسم المؤسسة",
          namePlaceholder: "مثال: شركة الحلول الذكية / علي المحروقي",
          email: "البريد الإلكتروني",
          emailPlaceholder: "name@example.com",
          consultationSummary: "ملخص الاستشارة",
          summaryPlaceholder:
            "اكتب نبذة عن المواضيع أو التحديات التقنية التي ترغب في مناقشتها خلال الجلسة...",
          step2Duration: "2. اختر مدة الاستشارة",
          oneHour: "ساعة واحدة (60 دقيقة)",
          twoHours: "ساعتين (120 دقيقة)",
          step3Calendar: "3. اختر التاريخ عبر الجدول (الأيام المتاحة بارزة)",
          august2026: "أغسطس 2026",
          days: {
            sun: "أحد",
            mon: "إثنين",
            tue: "ثلاثاء",
            wed: "أربعاء",
            thu: "خميس",
            fri: "جمعة",
            sat: "سبت",
          },
          step4Time: "4. وقت البدء المفضل",
          confirmBooking: "تأكيد وحجز الجلسة الاستشارية",
          bookingSuccessTitle: "تم تأكيد طلب الاستشارة بنجاح!",
          bookingSuccessDesc:
            "شكراً لك {{name}}. تم إرسال تفاصيل الدعوة ورابط الاجتماع عبر Google Meet إلى بريدك الإلكتروني.",
          bookAnother: "حجز استشارة أخرى",
          inquiryTitle: "طلب خدمة أو مشروع جديد",
          inquirySubtitle:
            "قم بتعبئة التفاصيل أدناه للبدء في تنفيذ مشروعك وتلقي عرض سعر مخصص.",
          inquirySuccess:
            "تم إرسال تفاصيل طلبك بنجاح! سيتم مراجعة الطلب والتواصل معك خلال أقل من 24 ساعة.",
          step1Personal: "1. المعلومات الشخصية",
          fullName: "الاسم الكامل",
          namePlaceholderInquiry: "مثال: محمد أحمد",
          phone: "رقم الهاتف",
          companyName: "اسم الشركة / المؤسسة (اختياري)",
          companyPlaceholder: "اسم الشركة أو المشروع",
          step2Project: "2. تفاصيل المشروع والخدمات",
          serviceType: "نوع الخدمة المطلوبة",
          licenseType: "اختر نوع التجربة المطلوبه",
          budget: "الميزانية التقديرية للمشروع",
          projectDesc: "وصف المشروع",
          descPlaceholder: "أدخل تفاصيل ومتطلبات مشروعك هنا...",
          submitInquiry: "إرسال الطلب",
        },
      },

      layouts: {
        // TopBar
        TopBar: {
          searchPlaceholder: "بحث...",
          messagesTitle: "الرسائل",
          newBadge: "جديد",
          viewAllMessages: "عرض كل الرسائل",
          notificationsTitle: "الإشعارات",
          markAllRead: "تحديد الكل كمقروء",
          myProfile: "الملف الشخصي",
          accountSettings: "إعدادات الحساب",
          logout: "تسجيل الخروج",
          demoAdmin: "مسؤول توضيحي",
          demoClient: "عميل توضيحي",
        },

        Sidebar: {
          // Sidebar - Groups
          groupMain: "الرئيسية",
          groupClientPortfolio: "أعمالي وحجوزاتي",
          groupClientFinance: "المالية والعقود",
          groupClientSupport: "الدعم والحساب",
          groupAdminOperations: "الطلبات والحجوزات",
          groupAdminProjects: "المشاريع والمعرض",
          groupAdminFinanceSupport: "المالية والدعم",
          groupAdminSystem: "إعدادات النظام",

          // Sidebar - Client Items
          navOverview: "نظرة عامة",
          navNotifications: "الإشعارات",
          navMyProjects: "مشاريعي",
          navMyBookings: "حجوزاتي",
          navRequestProject: "طلب مشروع جديد",
          navInvoicesPayments: "الفواتير والمدفوعات",
          navContractsProposals: "العقود والعروض",
          navDirectSupport: "الدعم المباشر",

          // Sidebar - Admin Items
          navClientsList: "قائمة العملاء",
          navTestimonials: "الآراء والتقييمات",
          navProjectRequests: "طلبات المشاريع",
          navDemoRequests: "طلبات العروض التوضيحية",
          navServicesPricing: "الخدمات والأسعار",
          navBookingsCalendar: "الحجوزات والتقويم",
          navAvailabilitySetup: "إعداد المواعيد",
          navActiveProjects: "المشاريع النشطة",
          navPortfolioCMS: "إدارة معرض الأعمال",
          navMyTasks: "مهامي",
          navInvoicesIncome: "الفواتير والدخل",
          navProposalsContracts: "العروض والعقود",
          navSupportTickets: "تذاكر الدعم",
          navSystemLogs: "سجلات النظام",
          navGlobalSettings: "الإعدادات العامة",

          // Sidebar - UI Labels & Badges
          consoleRole: "لوحة التحكم",
          clientHubRole: "مركز العميل",
          collapsePanel: "طي اللوحة",
          expandPanel: "توسيع اللوحة",
          newBadgeText: "جديد",
          needConsultationTitle: "هل تحتاج استشارة مباشرة؟",
          needConsultationDesc:
            "يمكنك حجز موعد جديد أو التواصل مباشرة عبر نظام الدعم.",
        },

        //DashboardLayout
        DashboardLayout: {
          // Tabs & Common Titles
          tabOverview: "نظرة عامة",
          tabLeads: "طلبات التواصل",
          tabClients: "العملاء",
          tabProjects: "المشاريع",
          tabTasks: "المهام",
          tabBookings: "الحجوزات",
          tabInvoices: "الفواتير",
          tabPortfolio: "معرض الأعمال",
          tabBlog: "المدونة",
          tabDemoRequests: "طلبات العروض",
          tabAvailability: "المواعيد المتاحة",
          tabServicesPricing: "الخدمات والأسعار",
          tabTestimonials: "التوصيات والآراء",
          tabProposalsContracts: "العروض والعقود",
          tabSupportRevisions: "الدعم والتعديلات",
          tabSystemRecords: "سجلات النظام",
          tabSettings: "الإعدادات",
          tabMyProjects: "مشاريعي",
          tabNewRequest: "طلب جديد",
          tabProfile: "الملف الشخصي",
          tabSignOut: "تسجيل الخروج",
          closeTab: "إغلاق التبويب",
        },

        Admin: {
          //Admin Overview
          AdminOverview: {
            welcomeTitle: "مرحباً بعودتك، المسؤول",
            welcomeSubtitle: "إليك ملخص ما يحدث في عملك اليوم.",
            exportReport: "تصدير التقرير",
            lastMonth: "الشهر الماضي:",

            // Dynamic Stats titles
            statTotalClients: "إجمالي العملاء",
            statMonthlyRevenue: "الإيرادات الشهرية",
            statPendingInvoices: "الفواتير المعلقة",
            statActiveProjects: "المشاريع النشطة",

            // Revenue Growth Chart
            revenueGrowth: "نمو الإيرادات",
            revenueOverview: "نظرة عامة على الأشهر الـ 6 الماضية",
            yearBadge: "عام 2026",

            // Months
            months: {
              jan: "يناير",
              feb: "فبراير",
              mar: "مارس",
              apr: "أبريل",
              may: "مايو",
              jun: "يونيو",
            },

            // Recent Activity
            recentActivity: "النشاط الأخير",
            realtimeUpdates: "تحديثات مباشرة ومباشرة لنشاط منصتك",
            viewAllLogs: "عرض كافة السجلات",

            // Requested Projects
            requestedProjects: "المشاريع المطلوبة",
            requestedProjectsDesc: "طلبات عملاء جديدة بانتظار المراجعة",
            priorityHigh: "عالي",
            priorityMedium: "متوسط",
            priorityLow: "منخفض",
            viewProjectRequests: "عرض طلبات المشاريع",

            // Upcoming Meetings
            upcomingMeetings: "المواعيد القادمة",
            upcomingMeetingsDesc: "مواعيد العملاء المسجلة",
            today: "اليوم",
            tomorrow: "غداً",
            viewCalendar: "عرض التقويم",

            // Support Tickets
            supportTickets: "تذاكر الدعم",
            supportTicketsDesc: "أحدث استفسارات ومشاكل العملاء",
            statusOpen: "مفتوحة",
            statusInProgress: "قيد التنفيذ",
            statusResolved: "تم الحل",
            manageTickets: "إدارة التذاكر",

            // Recent Invoices Table
            recentInvoices: "الفواتير الأخيرة",
            recentInvoicesDesc: "إدارة ومتابعة دورات الفوترة الأخيرة",
            viewAllInvoices: "عرض جميع الفواتير ←",
            colInvoiceId: "رقم الفاتورة",
            colClient: "العميل",
            colDate: "التاريخ",
            colAmount: "المبلغ",
            colStatus: "الحالة",
            statusPaid: "مدفوعة",
            statusPending: "معلقة",
            statusOverdue: "متأخرة",
          },

          //Admin Clients
          AdminClients: {
            title: "إدارة العملاء",
            subtitle:
              "لوحة تحكم تفاعلية لمتابعة وتحليل شبكة العملاء والمستحقات المالية.",
            addNewClient: "إضافة عميل جديد",
            totalClients: "إجمالي العملاء",
            activeClients: "العملاء النشطين",
            totalSpent: "إجمالي الاستثمارات",
            searchPlaceholder:
              "البحث باسم العميل، الشركة، أو البريد الإلكتروني...",
            filterAll: "الكل",
            filterActive: "نشط",
            filterLead: "محتمل",
            filterInactive: "غير نشط",
            viewDetails: "عرض التفاصيل",
            deleteClient: "حذف العميل",
            totalSpentLabel: "إجمالي الإنفاق",
            activeProjectsCount: "{{count}} مشاريع",
            noClientsFound: "لا يوجد عملاء يطابقون معايير البحث الحالية.",
            deleteConfirm: "هل أنت تأكد من رغبتك في حذف هذا العميل؟",
            statusActive: "نشط",
            statusLead: "محتمل",
            statusInactive: "غير نشط",
            defaultCompany: "شركة جديدة",
            defaultJobTitle: "عميل",
            defaultBio: "عميل تم إضافته حديثاً للنظام.",
            today: "اليوم",

            // Add Modal
            modalAddTitle: "إضافة عميل جديد",
            fullNameLabel: "الاسم الكامل *",
            fullNamePlaceholder: "مثال: أحمد محمود",
            emailLabel: "البريد الإلكتروني *",
            emailPlaceholder: "name@company.com",
            phoneLabel: "رقم الهاتف",
            phonePlaceholder: "+966...",
            companyNameLabel: "اسم الشركة",
            companyNamePlaceholder: "شركة التقنية",
            jobTitleLabel: "المسمى الوظيفي",
            jobTitlePlaceholder: "مدير المشاريع",
            accountStatusLabel: "حالة الحساب",
            initialSpentLabel: "إجمالي الإنفاق الأولي ($)",
            cancel: "إلغاء",
            saveClient: "حفظ العميل",

            // View Modal
            modalViewTitle: "تفاصيل العميل",
            clientId: "معرف العميل:",
            joinedDate: "تاريخ الانضمام:",
            address: "العنوان:",
            bioTitle: "نبذة عن العميل:",
            noBio: "لا توجد تفاصيل إضافية.",
            closeWindow: "إغلاق النافذة",
          },

          //Admin Testimonials
          adminTestimonials: {
            title: "آراء وانطباعات العملاء",
            subtitle:
              "إدارة وتأطير وتنظيم مراجعات العملاء المرتبطة بمعرض أعمالك.",
            addBtn: "إضافة رأي جديد",
            metrics: {
              total: "إجمالي الآراء",
              totalSub: "عناصر التقييم النشطة",
              featured: "الآراء المميزة",
              featuredSub: "معروضة في الأقسام الرئيسية",
              avgRating: "متوسط التقييم",
              avgRatingSub: "بناءً على نتائج العملاء",
              linkedProjects: "مرتبطة بالمشاريع",
              linkedProjectsSub: "عناصر المعرض المتصلة",
            },
            searchPlaceholder: "ابحث بالاسم، الشركة، أو محتوى التقييم...",
            featuredOnly: "المميزة فقط",
            generalShowcase: "العرض العام (بدون مشروع)",
            generalShowcaseShort: "عرض عام",
            status: {
              all: "جميع الحالات",
              published: "منشور",
              pending: "قيد المراجعة",
              pendingShort: "معلق",
              archived: "مؤرشف",
            },
            card: {
              at: "في",
              stars: "نجوم",
              markFeatured: "تمييز كـ رئيسي",
              featured: "مميز",
              edit: "تعديل المراجعة",
              delete: "حذف المراجعة",
              noDataTitle: "لم يتم العثور على أي آراء",
              noDataSub: "جرّب تغيير كلمات البحث أو خيارات التصفية.",
            },
            modal: {
              editTitle: "تعديل تقييم العملاء",
              createTitle: "إنشاء تقييم جديد",
              subtitle: "تكوين تفاصيل وخصائص التقييم",
              clientName: "اسم العميل",
              clientNamePlaceholder: "مثال: أليكس تيرنر",
              role: "المسمى / المنصب الوظيفي",
              rolePlaceholder: "مثال: مدير التكنولوجيا / صاحب المنتج",
              company: "اسم الشركة",
              companyPlaceholder: "مثال: شركة الابتكار المتقدم",
              project: "المشروع المرتبط في المعرض",
              status: "حالة النشر",
              rating: "التقييم",
              avatarUrl: "رابط الصورة الشخصية (Avatar)",
              feedback: "نص التقييم / الملاحظة",
              feedbackPlaceholder: "اكتب ملاحظات وتقييم العميل التفصيلي هنا...",
              highlightFeatured: "تحديد كتقييم مميز ورئيسي",
              cancel: "إلغاء",
              save: "حفظ التغييرات",
              publish: "نشر التقييم",
              anonymousClient: "عميل مجهول",
              verifiedClient: "عميل موثق",
              privateCompany: "شركة خاصة",
            },
          },

          //Admin Leads
          adminLeads: {
            title: "طلبات المشاريع المباشرة",
            subtitle:
              "إدارة، متابعة وتحديث طلبات العملاء المحتملين وتراخيص البرامج بسهولة وسرعة.",
            addDemoLead: "إضافة طلب تجريبي",
            demoLeadName: "محمد العبري",
            demoLeadCompany: "مؤسسة الابتكار السريع",
            demoLeadDesc:
              "طلب مخصص لتطوير منصة خدمات إلكترونية جديدة مع ربط قاعدة بيانات متكاملة.",

            // Stats & Filters
            statsTotal: "إجمالي الطلبات",
            statsTotalDesc: "جميع الاستفسارات الواردة",
            statsNew: "طلبات جديدة",
            statsNewDesc: "تتطلب اتخاذ إجراء",
            statsInReview: "قيد النقاش والمراجعة",
            statsInReviewDesc: "تم التواصل / مراجعة العرض",
            statsConverted: "مشاريع تم الاتفاق عليها",
            statsConvertedDesc: "صفقات ناجحة",

            filterAll: "الكل ({{count}})",
            searchPlaceholder: "بحث بالاسم، الشركة، البريد، أو الهاتف...",
            noResultsTitle: "لا توجد نتائج مطابقة",
            noResultsDesc: "جرب تعديل كلمة البحث أو فلتر الحالات الحالي.",

            // Lead Card & Details
            directContact: "تواصل مباشر",
            deleteLead: "حذف الطلب",
            viewDetails: "عرض التفاصيل",
            deleteConfirm: "هل أنت تأكد من رغبتك في حذف هذا الطلب نهائيًا؟",
            independentClient: "عميل مستقل / فردي",

            // Status Labels
            status: {
              new: "طلب جديد",
              contacted: "تم التواصل",
              in_review: "قيد المراجعة",
              converted: "صفقة ناجحة",
              closed: "مغلق / ملغى",
            },

            // Modal & Sections
            detailsTitle: "تفاصيل الطلب #{{id}}",
            createdDate: "تاريخ الإنشاء: {{date}}",
            currentStatusLabel: "حالة الطلب الحالية:",
            whatsapp: "واتساب",
            email: "البريد",
            clientAndCompany: "العميل والشركة",
            contactDetails: "بيانات التواصل",
            servicesAndBudget: "الخدمات والميزانية المتوقعة",
            requestedServices: "الخدمات المطلوبة:",
            budget: "الميزانية:",
            notSpecified: "غير محددة",
            preferredContact: "طريقة التواصل المفضلة:",
            projectDetailsTitle: "تفاصيل المشورع والطلب",
            internalNotesTitle: "السجل والملاحظات الداخلية",
            noInternalNotes: "لا توجد ملاحظات داخلية مضافة بعد.",
            addNotePlaceholder: "إضافة ملاحظة متابعة داخلية...",
            addNoteBtn: "إضافة",
            closeModal: "إغلاق",
            systemAdmin: "مدير النظام",
          },

          //Admin Demo Requests
          adminDemoRequests: {
            pageTitle: "طلبات معاينة المنتجات (Demo Requests)",
            pageSubtitle:
              "متابعة وجدولة طلبات العروض التوضيحية وتنسيق اجتماعات العملاء المباشرة.",
            addManualBtn: "إضافة طلب يدوي",
            stats: {
              total: "إجمالي الطلبات",
              pending: "قيد الانتظار",
              scheduled: "تمت الجدولة",
              completed: "مكتملة بنجاح",
            },
            searchPlaceholder: "البحث باسم العميل، الشركة، أو نوع الخدمة...",
            filterAll: "الكل",
            confirmDelete: "هل أنت تأكد من رغبتك في حذف هذا الطلب نهائياً؟",
            noRequests: "لا توجد طلبات عرض مطابقة لخيارات البحث الحالية.",
            dateLabel: "الموعد:",
            status: {
              pending: "قيد الانتظار",
              scheduled: "تمت الجدولة",
              completed: "مكتمل",
              rejected: "مرفوض",
            },
            deleteTooltip: "حذف الطلب",
            quickStatusTitle: "تحديث حالة الطلب السريع:",
            contactDetails: "بيانات التواصل",
            requestedDate: "الموعد:",
            requestDate: "تاريخ الطلب:",
            requestedProduct: "المنتج / الخدمة المطلوبة:",
            clientNotes: "ملاحظات ومتطلبات العميل:",
            meetingLinkTitle:
              "رابط اجتماع المعاينة المباشر (Google Meet / Zoom):",
            meetingLinkPlaceholder: "https://meet.google.com/...",
            saveBtn: "حفظ",
            openMeetingTooltip: "فتح رابط الاجتماع",
            notesSectionTitle: "سجل التحديثات والملاحظات الداخلية",
            addNotePlaceholder: "إضافة ملاحظة إدارية جديدة...",
            addBtn: "إضافة",
            noNotes: "لا توجد ملاحظات مسجلة لهذا الطلب بعد.",
            authorAdmin: "المشرف",
            selectPrompt: "اختر طلباً من القائمة لعرض تفاصيله الكاملة.",
            modal: {
              title: "إضافة طلب معاينة جديد",
              fullName: "الاسم الكامل *",
              email: "البريد الإلكتروني *",
              phone: "رقم الهاتف *",
              companyName: "اسم الشركة / الجهة",
              requestedDate: "تاريخ المعاينة المطلوب *",
              productOrService: "المنتج أو الخدمة المطلوبة *",
              defaultProduct: "تصميم واجهات وأنظمة SaaS & Dashboards",
              notes: "تفاصيل إضافية",
              cancelBtn: "إلغاء",
              submitBtn: "حفظ الطلب",
            },
          },

          // Admin Services Pricing
          AdminServicesPricing: {
            // Admin Services Pricing
            adminServicesTitle: "إدارة الخدمات والتسعير",
            adminServicesSubtitle:
              "تعديل وتخصيص باقات الخدمات، أسعار الساعة، والعروض التفاعلية المتاحة للعملاء.",
            restoreDefault: "استعادة الافتراضي",
            addNewService: "إضافة خدمة جديدة",
            confirmDeleteService:
              "هل أنت تأكد من رغبتك في حذف هذه الخدمة نهائياً؟",
            confirmResetDefaults:
              "هل ترغب في استعادة البيانات الافتراضية؟ ستفقد أي تعديلات لم تقم بحفظها.",

            // Stats
            statTotalServices: "إجمالي الخدمات",
            statTotalServicesSub: "منظمة ومقسمة حسـب التصنيفات",
            statActiveServices: "الخدمات النشطة",
            statActiveServicesSub: "{{percent}}% جاهزة للعرض الفعلي",
            statAvgRate: "متوسط سعر الساعة",
            statAvgRateUnit: "ر.ع/ساعة",
            statAvgRateSub: "يعتمد على تعقيد متطلبات المشروع",
            statFeatured: "الأكثر طلباً (Featured)",
            statFeaturedSub: "تظهر كباقات مميزة في الصفحة الرئيسية",

            // Search & Filters
            searchPlaceholder: "بحث باسم الخدمة أو المميزات...",
            catAll: "جميع التصنيفات",
            catDev: "برمجة وتطوير",
            catDesign: "تصميم UX/UI",
            catConsulting: "استشارات تقنية",
            catTrial: "طلب تجربة",
            catGeneral: "عام",

            statusAll: "كل الحالات",
            statusActive: "مفعل فقط",
            statusInactive: "معطل فقط",

            viewGrid: "عرض كشبكة بطاقات",
            viewTable: "عرض كجدول بيانات",
            noResultsTitle: "لا توجد نتائج مطابقة",
            noResultsSub: "جرب تغيير شروط البحث أو الفلاتر المحددة",

            // Service Card & Table
            popularBadge: "الباقة الأكثر طلباً",
            noDesc: "لا يوجد وصف متاح لهذه الخدمة.",
            estCostRange: "معدل التكلفة المتوقعة",
            asAgreed: "حسب الاتفاق",
            hourlyRate: "سعر الساعة",
            currencyOmr: "ر.ع",
            includedFeatures: "المميزات المضمنة:",
            noFeatures: "لم تدرج مميزات خاصة بعد",
            active: "مفعلة",
            inactive: "معطلة",
            togglePopular: "تمييز الخدمة كأكثر طلباً",
            editService: "تعديل الخدمة",
            deleteService: "حذف الخدمة",

            // Table Headers
            tableColService: "الخدمة والتصنيف",
            tableColEstCost: "التكلفة المتوقعة",
            tableColHourly: "سعر الساعة",
            tableColFeatures: "المميزات",
            tableColStatus: "الحالة",
            tableColActions: "إجراءات",

            // Modal Form
            modalEditTitle: "تعديل باقة الخدمة",
            modalAddTitle: "إضافة باقة خدمة جديدة",
            modalLabelName: "اسم الخدمة",
            modalLabelCategory: "التصنيف",
            modalLabelIcon: "الأيقونة",
            modalLabelPriceRange: "نص نطاق السعر",
            modalLabelHourlyRate: "سعر الساعة (ر.ع)",
            modalLabelDesc: "الوصف",
            modalLabelFeatures: "مميزات الباقة",
            modalFeaturePlaceholder: "أضف ميزة جديدة (مثال: تصميم متجاوب)...",
            modalAddFeatureBtn: "إضافة ميزة",
            modalLabelStatus: "حالة التفعيل",
            modalLabelPopular: "تمييز كباقة فضلى",
            btnCancel: "إلغاء",
            btnSave: "حفظ التغييرات",
          },

          // Admin Bookings
          adminBookings: {
            title: "إدارة الحجوزات والجلسات الاستشارية",
            subtitle:
              "جدولة الجلسات، متابعة حالة الاستشارات، وإدارة تفاصيل اللقاءات التقنية المباشرة.",
            exportData: "تصدير البيانات",
            addBooking: "إضافة حجز جديد",
            stats: {
              total: "إجمالي الحجوزات",
              confirmed: "المُؤكدة",
              pending: "قيد الانتظار",
              completed: "المكتملة",
              cancelled: "الملغاة",
              estimatedRevenue: "الإيراد المتوقع",
              omr: "ر.ع",
            },
            searchPlaceholder: "ابحث بالحجز، الاسم، البريد، أو الهاتف...",
            statusFilter: {
              all: "الكل",
              pending: "قيد الانتظار",
              confirmed: "مؤكدة",
              completed: "مكتملة",
              cancelled: "ملغاة",
            },
            noBookings: "لا توجد حجوزات تطابق خيارات البحث",
            noBookingsDesc:
              "تأكد من كتابة مصطلح البحث بشكل صحيح أو جرب تغيير الفلتر المحدد أعلاه.",
            requestedAt: "تم الطلب",
            duration: {
              oneHour: "ساعة واحدة",
              twoHours: "ساعتان",
              oneHourFull: "ساعة واحدة (60 دقيقة)",
              twoHoursFull: "ساعتان (120 دقيقة)",
            },
            statusLabel: {
              confirmed: "مُؤكد",
              pending: "قيد الانتظار",
              completed: "مكتمل",
              cancelled: "ملغى",
            },
            consultationTypes: {
              all: "كل أنواع الاستشارات",
              saas: "تطوير SaaS واجهات",
              fullstack: "Full-Stack مخصص",
              architecture: "معمارية برمجية",
              code_review: "فحص شفرات Code Review",
              other: "أخرى",
              general: "استشارة عامة",
            },
            currentStatusLabel: "حالة الحجز الحالية:",
            detailsBtn: "التفاصيل",
            deleteTitle: "حذف الحجز",
            deleteConfirm: "هل أنت تأكد من رغبتك في حذف هذا الحجز نهائياً؟",
            modal: {
              email: "البريد الإلكتروني",
              phone: "رقم الهاتف",
              notRegistered: "غير مسجل",
              estimatedPrice: "السعر التقديري",
              dateTime: "التاريخ والموعد",
              duration: "مدّة الاستشارة",
              consultationType: "نوع الاستشارة",
              summaryTitle: "ملخص الموضوع والاحتياج:",
              meetingUrlLabel: "رابط اجتماع اللقاء (Google Meet / Zoom):",
              meetingUrlPlaceholder: "https://meet.google.com/xxx-xxxx-xxx",
              openLink: "فتح الرابط",
              notesLabel: "ملاحظات المشرف الداخلية (Internal Admin Notes):",
              notesPlaceholder:
                "أضف أي ملاحظات خاصة بالاجتماع، النقاط التي تم الاتفاق عليها، أو توصيات المتابعة...",
              cancel: "إلغاء",
              saveChanges: "حفظ التغييرات",
              addTitle: "إضافة حجز جديد يدويًا",
              nameOrOrg: "الاسم / المؤسسة *",
              summaryPlaceholder: "ملخص موضوع الاستشارة...",
              submitAdd: "إضافة الحجز",
            },
          },

          // Admin Availability Setup
          AdminAvailabilitySetup: {
            pageTitle: "جدول التوفر والساعات المتاحة",
            pageDesc:
              "حدد أيام العمل والإجازات على مدار الشهر، وضبط ساعات التفرغ اليومية لتلقي حجوزات ومشاريع العملاء.",
            saveChanges: "حفظ التعديلات",
            savedSuccess: "تم حفظ الجدول بنجاح!",
            monthlyCalendarTitle: "تقويم الشهر الكامل",
            monthlyCalendarDesc:
              "انقر على أي يوم لتبديل حالته بين (يوم عمل / يوم إجازة)",
            workDayAvailable: "يوم عمل متاح",
            holidayUnavailable: "إجازة / غير متاح",
            dayOffLabel: "إجازة",
            dayWorkLabel: "عمل",
            dailyHoursTitle: "جدول ساعات العمل اليومية",
            dailyHoursDesc:
              "حدد ساعات بداية ونهاية وقت التفرغ لكل يوم في الأسبوع",
            applyToAll: "تطبيق",
            applyToAllTitle: "تطبيق التوقيت على باقي الأيام",
            offStatus: "مغلق (Off)",
            to: "إلى",
            bufferTimeTitle: "استراحة المطور (Buffer Time)",
            bufferTimeDesc:
              "الوقت الفاصل المستقطع بين كل حجزين لتفادي التداخل ومنحك وقتاً لمراجعة متطلبات المشروع أو كتابة الأكواد.",
            bufferOptions: {
              noBuffer: "بدون وقت فاصل (0 دقيقة)",
              min10: "10 دقائق راحة",
              min15: "15 دقيقة راحة (موصى به)",
              min30: "30 دقيقة راحة",
            },
            calendarSyncTitle: "مزامنة التقويم الخارجي",
            calendarSyncSubtitle: "Google Calendar / Outlook",
            calendarSyncDesc:
              "تمنع المزامنة التضارب بين مواعيدك مع العملاء وتسليمات البرمجيات في تقويمك الخاص.",
            connectGoogle: "ربط Google Calendar",
            daysOfWeek: {
              sun: "أحد",
              mon: "إثنين",
              tue: "ثلاثاء",
              wed: "أربعاء",
              thu: "خميس",
              fri: "جمعة",
              sat: "سبت",
            },
            months: [
              "يناير",
              "فبراير",
              "مارس",
              "أبريل",
              "مايو",
              "يونيو",
              "يوليو",
              "أغسطس",
              "سبتمبر",
              "أكتوبر",
              "نوفمبر",
              "ديسمبر",
            ],
          },

          // Admin Projects
          adminProjects: {
            title: "إدارة المشاريع",
            subtitle:
              "تتبع كافة المشاريع النشطة والمكتملة، متابعة نسب الإنجاز والميزانيات المخصصة لكل عميل.",
            newProjectBtn: "مشروع جديد",
            kpiTotal: "إجمالي المشاريع",
            kpiActive: "قيد التنفيذ",
            kpiCompleted: "مشاريع مكتملة",
            kpiTotalBudget: "إجمالي الميزانيات",
            searchPlaceholder: "بحث باسم المشروع أو العميل...",
            filterAll: "الكل",
            filterActive: "قيد التنفيذ",
            filterCompleted: "المكتملة",
            allClients: "جميع العملاء",
            selectClient: "اختر العميل",
            statusCompleted: "مكتمل",
            statusOnHold: "معلق",
            statusInProgress: "قيد التنفيذ",
            progressLabel: "مستوى الإنجاز",
            deliveryLabel: "التسليم:",
            noProjectsFound: "لا توجد مشاريع مطابقة",
            noProjectsSub: "جرّب تغيير كلمات البحث أو التصفية المختارة",
            modalCreateTitle: "إضافة مشروع جديد",
            modalNameLabel: "اسم المشروع",
            modalNamePlaceholder: "مثال: منصة إدارة المبيعات",
            modalClientLabel: "اختر العميل",
            modalBudgetLabel: "الميزانية المعينة ($)",
            modalStartDateLabel: "تاريخ البدء",
            modalEndDateLabel: "تاريخ الانتهاء المتوقع",
            modalEndDatePlaceholder: "مثال: 15 أكتوبر 2026",
            modalDescLabel: "وصف المشروع",
            modalDescPlaceholder: "تفاصيل عامة ونطاق العمل...",
            cancelBtn: "إلغاء",
            saveBtn: "حفظ المشروع",
            modalOverviewTitle: "نبذة عن المشروع",
            modalOverallProgress: "نسبة الإنجاز الإجمالية",
            modalTotalBudget: "الميزانية الكلية",
            modalDeliveryDate: "موعد التسليم المتوقع",
            modalMilestonesTitle: "المراحل المنجزة والملاحظات",
            milestoneCompleted: "مكتملة",
            milestoneInProgress: "قيد العمل",
            newClientDefault: "عميل جديد",
            defaultMilestoneTitle: "المرحلة الأولى: التحضير والتجهيز",
            defaultTask1: "تحديد المتطلبات الأساسية للعميل",
            defaultTask2: "إعداد خطة العمل والجدول الزمني",
          },

          //Admin Portfolio
          adminPortfolio: {
            title: "إدارة معرض الأعمال",
            subtitle:
              "قم بنشر وتنظيم وإبراز المشاريع المكتملة في معرض أعمالك العام.",
            addNewProject: "إضافة مشروع جديد",
            editProject: "تعديل مشروع المعرض",
            totalItems: "إجمالي عناصر المعرض",
            publishedLive: "المشاريع المنشورة",
            featuredSpotlights: "المشاريع المميزة",
            totalViews: "إجمالي المشاهدات",
            searchPlaceholder:
              "ابحث عن المشاريع حسب العنوان، العميل، أو تقنيات العمل...",
            noProjectsFound: "لم يتم العثور على مشاريع تطابق تصفية البحث.",
            selectedOverview: "نظرة عامة على المحدد",
            noDescription: "لا يوجد وصف مقدم.",
            client: "العميل",
            category: "الفئة",
            price: "السعر",
            date: "التاريخ",
            techStack: "تقنيات العمل",
            projectTitle: "عنوان المشروع",
            projectTitlePlaceholder: "مثال: قالب React SaaS",
            versionSubtitle: "الإصدار / العنوان الفرعي",
            versionPlaceholder: "مثال: (إصدار 2026) - أداء عالٍ",
            tagBadge: "الوسم / الشارة",
            tagPlaceholder: "مثال: قالب متميز",
            startingPrice: "السعر الابتدائي",
            startingPricePlaceholder: "مثال: 79$",
            clientName: "اسم العميل",
            clientNamePlaceholder: "مثال: أبلس للابتكار",
            coverImage: "مسار/رابط صورة الغلاف",
            coverImagePlaceholder: "مثال: /5.avif أو https://...",
            techStackComma: "تقنيات العمل (مفصولة بفواصل)",
            techStackPlaceholder: "React, TypeScript, Tailwind CSS, Django",
            liveDemoUrl: "رابط العرض المباشر",
            githubUrl: "رابط مستودع GitHub",
            description: "الوصف",
            descriptionPlaceholder: "ملخص تفصيلي للمشروع...",
            featuredHighlight: "تمييز المشروع",
            hasCaseStudy: "يحتوي على دراسة حالة",
            cancel: "إلغاء",
            updateProject: "تحديث المشروع",
            saveProject: "حفظ المشروع",
            toggleFeatured: "تبديل التمييز",
            // Categories
            allCategories: "جميع الفئات",
            saasPlatform: "منصة SaaS",
            fullStackWeb: "ويب متكامل",
            eCommerce: "تجارة إلكترونية",
            mobileApp: "تطبيق جوال",
            // Statuses
            allStatuses: "جميع الحالات",
            published: "منشور",
            draft: "مسودة",
            archived: "مؤرشف",
          },

          // Admin Tasks
          AdminTasks: {
            title: "متابعة وتنفيذ المهام",
            description:
              "إدارة مرنة ودقيقة لكافة مراحل المشاريع، المهام التنفيذية والجدول الزمني.",
            addNewTask: "إضافة مهمة جديدة",
            totalTasks: "إجمالي المهام",
            completedTasks: "المهام المكتملة",
            pendingTasks: "المهام المتبقية",
            completionRate: "نسبة الإنجاز",
            searchPlaceholder: "ابحث عن مهمة...",
            allProjects: "جميع المشاريع",
            filterAll: "الكل",
            filterPending: "المتبقية",
            filterCompleted: "المكتملة",
            client: "العميل",
            projectProgress: "نسبة تقدم المشروع",
            tasksCompleted: "{{completed}} من {{total}} مهام مكتملة",
            statusCompleted: "مكتملة",
            statusInProgress: "قيد التنفيذ",
            statusPending: "قيد الانتظار",
            noTasksFound: "لا توجد مهام مطابقة للفلتر",
            unassigned: "غير محدد",
            soon: "قريباً",
            modalTitle: "إضافة مهمة جديدة",
            taskTitleLabel: "عنوان المهمة",
            taskTitlePlaceholder: "مثال: مراجعة الكود البرمجي...",
            targetProjectLabel: "المشروع المستهدف",
            selectProject: "اختر المشروع",
            targetMilestoneLabel: "المرحلة (Milestone)",
            selectMilestone: "اختر المرحلة",
            assigneeLabel: "المسؤول",
            assigneePlaceholder: "اسم المسؤول",
            dueDateLabel: "تاريخ الاستحقاق",
            dueDatePlaceholder: "مثال: 15 سبتمبر",
            cancel: "إلغاء",
            saveTask: "حفظ المهمة",
          },

          // Admin Invoices
          invoices: {
            title: "إدارة الفواتير المتقدمة",
            subtitle:
              "متابعة الفواتير الصادرة، التسويات المالية، وتوليد التقارير في مكان واحد.",
            createNew: "إنشاء فاتورة جديدة",
            searchPlaceholder: "بحث برقم الفاتورة، العميل، أو المشروع...",
            allStatuses: "جميع الحالات",
            allClients: "جميع العملاء",
            selectPlaceholder: "اختر...",
            stats: {
              total: "إجمالي الفواتير",
              totalDesc: "المبلغ التراكمي لجميع العمليات",
              paid: "المبالغ المدفوعة",
              paidDesc: "تم التحصيل بنجاح",
              pending: "في انتظار الدفع",
              pendingDesc: "تحت فترة الاستحقاق",
              overdue: "المبالغ المتأخرة",
              overdueDesc: "تتطلب متابعة سريعة",
            },
            status: {
              paid: "مدفوعة",
              pending: "معلقة",
              overdue: "متأخرة",
            },
            table: {
              invoiceNumber: "رقم الفاتورة",
              client: "العميل",
              project: "المشروع / البيان",
              amount: "المبلغ",
              status: "الحالة",
              issueDate: "تاريخ الإصدار",
              dueDate: "تاريخ الاستحقاق",
              actions: "الإجراءات",
              noData: "لا توجد فواتير مطابقة لخيارات البحث المحددة.",
            },
            actions: {
              viewDetails: "عرض بالتفاصيل",
              markAsPaid: "تحديد كمدفوعة",
            },
            modals: {
              createTitle: "إصدار فاتورة جديدة",
              clientLabel: "العميل",
              projectLabel: "المشروع والمرجع",
              titleLabel: "عنوان الفاتورة / الوصف العام",
              titlePlaceholder:
                "مثال: تطوير مرحلة واجهات المستخدم والميزات الجديدة",
              dueDateLabel: "تاريخ الاستحقاق",
              dueDatePlaceholder: "مثال: 15 سبتمبر 2026",
              itemsTitle: "بنود الفاتورة والخدمات",
              addItem: "إضافة بند",
              itemDescPlaceholder: "وصف الخدمة / البند",
              quantityPlaceholder: "الكمية",
              pricePlaceholder: "السعر",
              totalCalculated: "إجمالي المبلغ المحسوب:",
              notesLabel: "ملاحظات الفاتورة",
              notesPlaceholder:
                "ملاحظات توضيحية للعميل أو شروط التحويل البنكي...",
              cancel: "إلغاء",
              saveAndIssue: "حفظ وإصدار",
              viewDetailsTitle: "تفاصيل الفاتورة",
              currentStatus: "الحالة الحالية",
              paymentMethod: "طريقة الدفع",
              notSpecified: "غير محدد",
              itemsTableTitle: "تفاصيل البنود والخدمات",
              description: "الوصف",
              quantity: "الكمية",
              unitPrice: "سعر الوحدة",
              total: "الإجمالي",
              defaultItemDesc: "خدمة تطوير برمجية",
              defaultProjectTitle: "مشروع تطوير عام",
            },
          },

          // Admin Proposals Contracts
          AdminProposalsContracts: {
            proposalsHeaderTitle: "محرك العروض والعقود",
            proposalsHeaderSub:
              "إدارة وإبرام ومتابعة العقود الرقمية والاتفاقيات التجارية.",
            createNewDocument: "إنشاء مستند جديد",

            // Analytics KPIs
            signedRevenueValue: "قيمة الإيرادات الموقعة",
            activeAgreements: "اتفاقيات ملزمة قانونياً ونشطة",
            pendingDealPipeline: "قيمة الصفقة المعلقة",
            awaitingApproval: "في انتظار موافقة العميل والتوقيع الإلكتروني",
            acceptanceRate: "نسبة القبول",
            proposalsClosed: "عروض تم إغلاقها بنجاح",

            // Tabs & Filters
            allDocuments: "جميع المستندات",
            proposals: "العروض",
            contracts: "العقود",
            searchPlaceholder: "البحث بالعنوان، اسم العميل، أو المعرف...",

            // Statuses
            allStatuses: "جميع الحالات",
            statusDraft: "مسودة",
            statusPending: "مرسل / قيد الانتظار",
            statusAccepted: "موقع ونشط",
            statusDeclined: "مرفوض",
            statusExpired: "منتهي الصلاحية",

            // Types
            typeProposal: "عرض سعر",
            typeContract: "عقد",

            // Table Headers
            thDocDetails: "تفاصيل المستند",
            thClientCompany: "العميل والشركة",
            thType: "النوع",
            thContractValue: "قيمة العقد",
            thStatus: "الحالة",
            thActions: "الإجراءات",
            noDocumentsFound: "لم يتم العثور على مستندات تطابق معايير البحث.",
            issuedOn: "تاريخ الإصدار",

            // Tooltips & Actions
            previewDetails: "معاينة تفاصيل المستند",
            sendToClient: "إرسال المستند للعميل",
            downloadPdf: "تحميل PDF",
            deleteDocument: "حذف المستند",

            // Document Drawer Preview
            currentStatus: "الحالة الحالية",
            totalAmount: "المبلغ الإجمالي",
            clientName: "اسم العميل",
            companyName: "اسم الشركة",
            legallyVerifiedSignature: "توقيع إلكتروني موثق قانونياً",
            signedByOn: "تم التوقيع بواسطة {{name}} بتاريخ {{date}}",
            scopeOfWork: "نطاق العمل",
            deliverables: "المخرجات والمسلمات",
            activityAuditTrail: "سجل تتبع النشاطات",
            byUser: "بواسطة {{user}}",
            closeWindow: "إغلاق النافذة",

            // Modal Form
            createModalTitle: "إنشاء مستند تجاري جديد",
            fieldDocTitle: "عنوان المستند",
            fieldDocTitlePlaceholder:
              "مثال: إعادة تصميم متجر إلكتروني للمؤسسات",
            fieldClientName: "اسم العميل",
            fieldClientNamePlaceholder: "مثال: أحمد محمد",
            fieldCompanyName: "اسم الشركة",
            fieldCompanyNamePlaceholder: "مثال: شركة الأمل",
            fieldDocType: "نوع المستند",
            fieldAmount: "المبلغ ($)",
            fieldPaymentTerms: "شروط الدفع",
            fieldScopeOfWork: "نطاق العمل (عنصر واحد في كل سطر)",
            fieldDeliverables: "المخرجات والمسلمات (عنصر واحد في كل سطر)",
            cancel: "إلغاء",
            submitCreate: "إنشاء المستند",
            confirmDelete: "هل أنت ألكد من رغبتك في حذف هذا المستند نهائياً؟",
            downloadAlert: "جاري تحميل ملف PDF الموقع: {{id}}",
          },

          // Admin Support And Revisions
          AdminSupportAndRevisions: {
            title: "الدعم وتعديلات العملاء",
            description:
              "مراجعة جولات التعديل، تتبع سجلات الأخطاء البرمجية، والتفاعل مع استفسارات العملاء.",

            // Metrics Cards
            activeTickets: "التذاكر النشطة",
            activeTicketsSub: "طلبات غير محلولة تتطلب المراجعة",
            pendingRevisions: "تعديلات معلقة",
            pendingRevisionsSub: "تعديلات النطاق المطلوبة من قبل العملاء",
            criticalBugs: "أخطاء حرجة",
            criticalBugsSub: "أخطاء برمجية نشطة تؤثر على تطبيقات العملاء",

            // Controls & Search
            searchPlaceholder:
              "البحث باسم العميل، الملاحظات، أو رقم التذكرة...",

            // Filter Options
            filterAll: "جميع التصنيفات",
            filterRevision: "نطاق التعديلات",
            filterBug: "خطأ برمجي",
            filterQuestion: "استفسار عميل",

            // Status Badges & Priority
            priorityHigh: "عالية",
            priorityMedium: "متوسطة",
            priorityLow: "منخفضة",
            statusPending: "قيد الانتظار",
            statusInProgress: "قيد التنفيذ",
            statusResolved: "مكتملة",
            cycleStatusTooltip: "انقر لتغيير حالة الطلب",

            // Actions & Empty States
            replyBtn: "رد",
            noTicketsFound: "لا توجد تذاكر عملاء تطابق معايير البحث الخاصة بك.",

            // Modal - Reply Interface
            replyModalTitle: "واجهة الرد على العميل",
            ticketId: "رقم التذكرة:",
            clientProfileInfo: "بيانات ملف العميل",
            clientName: "اسم العميل",
            phoneNumber: "رقم الهاتف",
            dispatchMsgLabel: "رسالة الرد والتواصل",
            dispatchMsgPlaceholder:
              "اكتب ردك أو خطوات الحل الموجهة للعميل هنا...",
            cancelBtn: "إلغاء",
            sendReplyBtn: "إرسال الرد",
            alertReplySuccess: "تم إرسال الرد بنجاح إلى {{clientName}}!",
          },

          // Admin Records
          AdminRecords: {
            pageTitle: "سجلات وفعاليات النظام",
            pageDescription:
              "مراقبة أنشطة المشرفين، تتبع استثناءات البرمجة المباشرة، وتدقيق أنشطة الخادم والمستخدمين.",
            refreshData: "تحديث البيانات",
            clearAll: "مسح الكل",
            exportCSV: "تصدير التقرير (CSV)",

            // KPI Cards
            totalRecords: "إجمالي السجلات",
            storedRecords: "سجل مُخزن",
            successfulOps: "عمليات ناجحة",
            stablePerformance: "أداء مستقر",
            runtimeWarnings: "تحذيرات التشغيل",
            warningNotes: "ملاحظات تنبيهية",
            criticalErrors: "أخطاء حرجة",
            needsAction: "تحتاج معالجة",

            // Search & Filters
            searchPlaceholder:
              "البحث بالمُشغل، وصف الإجراء، المعرف ID أو عنوان IP...",
            allSections: "كل الأقسام",
            allStreams: "جميع السجلات",
            infoLogs: "معلومات النظام",
            successLogs: "عمليات ناجحة",
            warningLogs: "تحذيرات التشغيل",
            errorLogs: "أخطاء حرجة",

            // Table Headers
            logId: "معرف السجل",
            operator: "المُشغل / المشرف",
            actionDetails: "تفاصيل الإجراء",
            section: "القسم",
            level: "المستوى",
            timestamp: "التوقيت",
            actions: "خيارات",

            // Confirmations & Modals
            deleteConfirm:
              "هل أنت تأكد من إزالة هذا السجل بشكل دائم من القاعدة؟",
            clearAllConfirm:
              "تحذير: هل ترغب في مسح جميع سجلات النظام المخزنة؟ لا يمكن التراجع عن هذا الإجراء.",
            deleteLogTooltip: "حذف السجل",
            noRecordsTitle: "لا توجد سجلات مطابقة",
            noRecordsDesc:
              "لم نجد أي سجلات تتوافق مع معايير البحث والفلترة المحددة.",

            // Modal Details
            logDetails: "تفاصيل السجل",
            operatorTitle: "المُشغل المسؤول:",
            actionDescTitle: "وصف الإجراء:",
            ipTitle: "عنوان IP:",
            timestampTitle: "التوقيت:",
            close: "إغلاق",
          },

          // Admin Settings
          AdminSettings: {
            headerTitle: "إعدادات النظام",
            headerSubtitle:
              "إدارة ملف المطور، الهوية البصرية، بيانات الأمان، وربط الواجهات (APIs).",
            tabs: {
              profile: "ملف المطور",
              services: "الخدمات والأسعار",
              integrations: "الربط و API",
              security: "الأمان والصلاحيات",
            },
            profileSection: {
              title: "هوية المطور والموقع",
              subtitle:
                "إدارة هوية معرض أعمالك، عنوان الصفحة (Title)، وأيقونة الموقع (Favicon).",
              metaBoxTitle: "بيانات الموقع (التحكم بـ index.html)",
              siteTitleLabel: "عنوان الموقع (<title>)",
              siteTitlePlaceholder: "مثال: معرض أعمالي",
              faviconLabel: "مسار / رابط الأيقونة (Favicon)",
              faviconPlaceholder: "/favicon.svg أو https://...",
              fullNameLabel: "الاسم الكامل",
              professionalTitleLabel: "المسمى الوظيفي",
              bioLabel: "نبذة قصيرة",
              emailLabel: "البريد الإلكتروني العام",
              websiteLabel: "الموقع الشخصي",
              githubLabel: "اسم المستخدم في GitHub",
              linkedinLabel: "حساب LinkedIn",
            },
            servicesSection: {
              title: "الخدمات والأسعار",
              subtitle:
                "تحديد خيارات الفوترة والتحكم في حالة التفرغ للعمل أمام العملاء.",
              availableHireTitle: "متاح للمشاريع الجديدة",
              availableHireDesc: 'عرض شارة "متاح للعمل" على موقعك العام.',
              maintenanceTitle: "وضع الصيانة",
              maintenanceDesc: 'توجيه الزوار إلى صفحة "قيد الصيانة".',
              notificationsTitle: "تنبيهات النظام",
              notificationsDesc:
                "استلام إشعارات فورية عند دفع الفواتير أو إرسال طلبات جديدة.",
            },
            integrationsSection: {
              title: "الربط و API",
              subtitle: "إدارة مفاتيح API والخدمات الخارجية للمطورين.",
              stripeLabel: "مفتاح Stripe السري",
              githubTokenLabel: "رمز الوصول الشخصي لـ GitHub",
              resendLabel: "مفتاح Resend API",
            },
            securitySection: {
              title: "الأمان والصلاحيات",
              subtitle: "تحديث بيانات اعتماد المسؤول وكلمة المرور.",
              currentPasswordLabel: "كلمة المرور الحالية",
              newPasswordLabel: "كلمة المرور الجديدة",
              confirmPasswordLabel: "تأكيد كلمة المرور الجديدة",
              passwordPlaceholder: "8 أحرف على الأقل",
            },
            saveSuccess: "تم حفظ الإعدادات بنجاح!",
            saving: "جاري الحفظ...",
            saveChanges: "حفظ التغييرات",
          },

          // Amin Settings
          adminSettings: {
            profile: {
              name: "أحمد المحروقي",
              title: "مهندس تطوير متكامل وصانع أنظمة SaaS",
              bio: "بناء أنظمة ويب عالية الأداء، واجهات حديثة متجاوبة، وحلول سحابية قابلة للتوسع.",
            },
            services: {
              currency: "دولار أمريكي",
            },
          },
        },

        Client: {
          // // client Request
          clientRequest: {
            heroTitle: "طلب تطوير مشروع وحلول برمجية",
            heroSubtitle:
              "قم بتعبئة النموذج أدناه لمساعدتنا في فهم متطلباتك بدقة وتقديم أنسب الحلول والتقديرات الفنية.",
            steps: {
              services: "الخدمات المطلوبة",
              budget: "الميزانية والتراخيص",
              details: "تفاصيل المشروع",
              contact: "بيانات التواصل",
            },
            step1: {
              title: "اختر الخدمات التي تحتاجها لمشروعك",
              subtitle: "يمكنك تحديد أكثر من خدمة للحصول على نظام متكامل.",
              estimatedRange: "النطاق التقديري",
            },
            step2: {
              title: "الميزانية وتراخيص البرامج",
              subtitle: "حدد نطاق الميزانية المخصصة وتفضيلات الترخيص إن وجدت.",
              budgetLabel: "الميزانية المخصصة للمشروع",
              licenseLabel: "نوع الترخيص المطلوبة للنظام",
            },
            step3: {
              title: "تفاصيل ومتطلبات المشروع",
              subtitle:
                "اشرح فكرة المشروع، الأهداف المرجوة، والوظائف الرئيسية.",
              descLabel: "وصف المشروع والوظائف الأساسية *",
              descPlaceholder:
                "اذكر المتطلبات بالتفصيل، مثل: نحتاج نظام للربط مع بوابات الدفع ولدينا نظام حالي يفضل الربط معه...",
              notesLabel: "ملاحظات أو روابط إضافية (اختياري)",
              notesPlaceholder: "روابط تصاميم Figma، أمثلة لمواقع مشابهة...",
            },
            step4: {
              title: "معلومات التواصل والمؤسسة",
              subtitle:
                "سوف نستخدم هذه البيانات لإرسال مقترح العرض والتواصل معك.",
              fullName: "الاسم الكامل *",
              fullNamePlaceholder: "أدخل اسمك الكامل",
              companyName: "اسم الشركة / المؤسسة",
              companyPlaceholder: "اسم الجهة أو الشركة إن وجد",
              email: "البريد الإلكتروني *",
              emailPlaceholder: "name@company.com",
              phone: "رقم الهاتف / الواتساب *",
              phonePlaceholder: "+968 9000 0000",
              preferredContact: "طريقة التواصل المفضلة",
              referralSource: "كيف تعرفت علينا؟",
            },
            success: {
              title: "تم استلام طلبك بنجاح!",
              message:
                "شكرًا لاهتمامك. سيلتقط فريقنا الطلب ونتواصل معك في أقرب وقت عبر وسائل التواصل المحددة.",
              referenceCode: "الرقم المرجعي للطلب",
              submitAnother: "تقديم طلب مشروع آخر",
            },
            buttons: {
              back: "السابق",
              next: "التالي",
              submit: "إرسال الطلب الآن",
            },
          },

          // client Notifications
          notifications: {
            title: "مركز الإشعارات",
            newBadge: "{{count}} جديد",
            subtitle:
              "عرض ومتابعة كافة التحديثات الخاصة بحسابك ومشاريعك لحظة بلحظة.",
            markAllRead: "تحديد الكل كمقروء",
            empty: 'لا توجد إشعارات لعرضها في تصنيف "{{tab}}".',
            pinned: "مثبت",
            pinTooltip: "تثبيت الإشعار",
            unpinTooltip: "إلغاء التثبيت",
            markReadTooltip: "تحديد كـ مقروء",
            markUnreadTooltip: "تحديد كـ غير مقروء",
            deleteTooltip: "حذف الإشعار",
            tabs: {
              all: "الكل",
              unread: "غير المقروءة",
              contract: "العقود",
              invoice: "الفواتير",
              support: "الدعم",
              security: "الأمان",
              system: "النظام",
            },
            types: {
              contract: "عقد / مقترح",
              invoice: "مالية / فواتير",
              security: "تنبيه أمني",
              support: "الدعم الفني",
              system: "النظام",
            },
          },

          // client Overview
          clientOverview: {
            portalActive: "بوابة العملاء نشطة",
            welcomeBack: "مرحباً بك مجدداً!",
            subtitle:
              "تابع تقدم المشاريع، راجع المراحل الرئيسية، وقم بإدارة الفواتير المعلقة بكل سهولة.",
            activeProjects: "المشاريع النشطة",
            totalPipeline: "إجمالي {{count}} مشاريع في قيد التنفيذ",
            openInvoices: "الفواتير المفتوحة",
            actionRequired: "مطلوب اتخاذ إجراء للمدفوعات المعلقة",
            allCleared: "تم تسديد جميع الفواتير",
            totalOutstanding: "إجمالي المبلغ المستحق",
            encryptedCheckout: "يدعم الدفع المشفر والآمن",
            projectWorkflows: "سير عمل المشاريع",
            filterPlaceholder: "تصفية المشاريع...",
            filterAll: "الكل",
            filterInProgress: "قيد التنفيذ",
            filterCompleted: "مكتملة",
            budget: "الميزانية",
            overallProgress: "التقدم الإجمالي",
            deliverableChecklist: "قائمة تسليم المهام",
            targetCompletion: "تاريخ الإنجاز المستهدف: {{date}}",
            details: "التفاصيل",
            noProjects: "لا توجد مشاريع تطابق خيارات التصفية.",
            pendingFinancials: "المستحقات المالية المعلقة",
            invoicesBadge: "الفواتير",
            due: "تاريخ الاستحقاق: {{date}}",
            payInvoice: "دفع الفاتورة",
            paymentSettled: "تم تسديد الدفعة",
            checkout: "إتمام الدفع",
            confirmPayment: "تأكيد عملية الدفع",
            releasingFunds: "إفراج عن الأموال للفاتورة",
            projectRef: "مرجع المشروع",
            amountDue: "المبلغ المستحق",
            confirmPayNow: "تأكيد والدفع الآن",
            status: {
              in_progress: "قيد التنفيذ",
              under_review: "قيد المراجعة",
              completed: "مكتمل",
            },
          },

          // Client Projects
          clientProjects: {
            title: "مشاريعي والتطوير",
            badgeProjectsCount: "{{count}} مشاريع",
            subtitle:
              "متابعة دقيقة لمراحل الإنجاز، قائمة المهام والتسليمات المعتمدة.",
            stats: {
              activeProjects: "المشاريع النشطة",
              completed: "المكتملة",
              deliverablesCount: "التسليمات المنجزة",
              totalBudget: "إجمالي الاستثمار",
            },
            searchPlaceholder: "ابحث باسم المشروع...",
            filterAll: "كافة المشاريع",
            filterActive: "نشطة",
            filterCompleted: "مكتملة",
            noProjectsFound: "لم يتم العثور على أي مشاريع مطابقة للبحث.",
            progressLabel: "نسبة الإنجاز",
            startDate: "تاريخ البدء",
            estimatedCompletion: "التسليم المتوقع",
            budget: "الميزانية",
            sections: {
              milestonesAndTasks: "مراحل العمل والمهام التفصيلية",
              deliverables: "المخرجات المتاحة للتنزيل والمعاينة",
            },
            status: {
              completed: "مكتمل بنجاح",
              in_progress: "جاري التنفيذ",
              on_hold: "متوقف مؤقتاً",
              active: "نشط",
              upcoming: "قادمة",
            },
            taskDueDate: "موعد: {{date}}",
            accordionExpand: "عرض التفاصيل",
            accordionCollapse: "طي التفاصيل",
          },

          //client Bookings
          clientBookings: {
            title: "سجل الاستشارات والحجوزات",
            subtitle:
              "متابعة مواعيد الجلسات الاستشارية والمقابلات التقنية المباشرة",
            stats: {
              total: "إجمالي الحجوزات",
              confirmed: "الجلسات المؤكدة",
              pending: "قيد المراجعة",
              completed: "جلسات مكتملة",
            },
            searchPlaceholder: "ابحث برقم الحجز أو الموضوع...",
            filters: {
              all: "الكل",
              confirmed: "مؤكدة",
              pending: "معلقة",
              completed: "مكتملة",
              cancelled: "ملغاة",
            },
            status: {
              confirmed: "مؤكد",
              pending: "قيد الانتظار",
              completed: "مكتمل",
              cancelled: "ملغى",
            },
            types: {
              saas: "تصميم SaaS",
              fullstack: "تطوير Full-Stack",
              architecture: "معمارية برمجية",
              code_review: "مراجعة الكود",
              default: "استشارة تقنية",
            },
            time: {
              at: "الساعة",
              oneHour: "ساعة واحدة",
              twoHours: "ساعتان",
            },
            actions: {
              viewDetails: "عرض التفاصيل",
              joinMeeting: "انضمام للاجتماع المباشر",
              cancelBooking: "إلغاء هذا الحجز",
              close: "إغلاق",
              joinGoogleMeet: "انضم عبر Google Meet",
            },
            emptyState: {
              title: "لا توجد نتائج مطابقة",
              desc: "لم نجد أي استشارات أو حجوزات تطابق خيارات البحث الحالية.",
            },
            modal: {
              detailsTitle: "تفاصيل وموضوع الاستشارة",
              clientOrOrg: "العميل / الجهة",
              email: "البريد الإلكتروني",
              scheduledDate: "الموعد المحدد",
              timeAndDuration: "الوقت والمدة",
              adminNotes: "ملاحظات المستشار:",
            },
          },

          //Client Invoices
          ClientInvoices: {
            // Invoices Page
            invoicesTitle: "فواتيري والمدفوعات",
            invoicesSubtitle:
              "استعرض جميع الفواتير والمطالبات المالية، مع إمكانية التحميل والمعاينة المباشرة وإجراء عمليات السداد الإلكتروني.",
            printReport: "طباعة التقرير",

            // KPIs
            totalSpent: "إجمالي المدفوعات",
            paidSuccessfully: "تم تسويتها بنجاح",
            pendingAmount: "قيد الانتظار",
            requiresAction: "تتطلب إجراء قريب",
            overdueAmount: "فواتير متأخرة",
            followUpToday: "يرجى المتابعة اليوم",
            totalInvoicesCount: "عدد الفواتير الكلي",
            recordedDocuments: "مستندات مالية مسجلة",

            // Controls & Filters
            searchPlaceholder: "البحث برقم الفاتورة أو اسم المشروع...",
            filterAll: "الكل",
            filterPaid: "مدفوعة",
            filterPending: "قيد الانتظار",
            filterOverdue: "متأخرة",
            gridView: "عرض الشبكة",
            listView: "عرض القائمة",

            // Status Badges
            statusPaid: "مدفوعة",
            statusPending: "قيد الانتظار",
            statusOverdue: "متأخرة",

            // Card / Table Labels
            issueDate: "تاريخ الإصدار",
            dueDate: "تاريخ الاستحقاق",
            paidDateLabel: "تم السداد بتاريخ",
            previewDetails: "معاينة التفاصيل",
            payNow: "سداد الآن",
            download: "التحميل",
            invoiceNumber: "رقم الفاتورة",
            projectDescription: "المشروع / البيان",
            amount: "المبلغ",
            status: "الحالة",
            actions: "الإجراءات",
            noInvoicesFound: "لا توجد فواتير مطابقة",
            tryChangingSearch:
              "جرّب تغيير كلمات البحث أو تغيير أزرار التصفية أعلاه.",

            // Details Modal
            invoiceDetails: "تفاصيل الفاتورة",
            totalAmount: "المبلغ الإجمالي",
            billedTo: "صادرة إلى:",
            invoiceInfo: "تفاصيل الفاتورة:",
            project: "المشروع:",
            servicesBreakdown: "تفاصيل الخدمات والبنود",
            itemDescription: "الوصف",
            itemQty: "الكمية",
            itemUnitPrice: "سعر الوحدة",
            itemTotal: "الإجمالي",
            notesAndTerms: "ملاحظات وشروط:",
            printInvoice: "طباعة الفاتورة",
            proceedToPayment: "الانتقال للسداد",
            close: "إغلاق",

            // Payment Modal
            payInvoice: "سداد الفاتورة",
            amountToPay: "المبلغ المستحق للدفع",
            cardholderName: "اسم صاحب البطاقة",
            cardNumber: "رقم البطاقة",
            expiryDate: "تاريخ الانتهاء",
            cvcCode: "رمز CVC",
            paying: "جاري المعالجة...",
            paymentSuccessTitle: "تم الدفع بنجاح!",
            paymentSuccessMessage:
              "تم تسوية الفاتورة {{number}} بنجاح وتحديث حالة الحساب.",
            today: "اليوم",
            creditCardMethod: "بطاقة الائتمان MADA / Visa",
          },

          //Client Proposals
          proposals: {
            title: "بوابة العقود والاتفاقيات الرقمية",
            subtitle:
              "مراجعة الشروط التجارية، نطاق العمل التقني، وتوقيع العقود الرسمية إلكترونياً.",
            securityProtocol: "بروتوكول الأمان",
            securityEncrypt: "توقيع إلكتروني مشفر 256-Bit",
            searchPlaceholder: "ابحث عن العقود والاتفاقيات...",
            filterAll: "جميع المستندات",
            filterPending: "قيد الانتظار والاعتماد",
            filterAccepted: "مقبول وموقع",
            filterExpired: "منتهي الصلاحية",
            noDocuments: "لا توجد مستندات متاحة.",
            selectDocumentPrompt:
              "حدد مستنداً من القائمة لعرض تفاصيل الاتفاقية الكاملة.",
            issuedOn: "تاريخ الإصدار",
            project: "المشروع:",
            downloadPdf: "تحميل نسخة PDF",
            signDocumentNow: "توقيع المستند الآن",
            legallySignedTitle: "تم القبول والتوقيع الرقمي بنجاح",
            signedByOn: "وقع بواسطة {{name}} بتاريخ {{date}}",
            totalInvestmentValue: "إجمالي قيمة الاستثمار",
            validityExpiration: "تاريخ انتهاء الصلاحية",
            validUntil: "صالح حتى: {{date}}",
            technicalScope: "نطاق العمل التقني",
            deliverablesAndMilestones: "المخرجات ومحطات التسليم",
            milestoneSchedule: "جدول الدفعات والمراحل المالية",
            milestoneTitle: "عنوان المرحلة",
            ratio: "النسبة",
            amount: "المبلغ",
            dueDate: "تاريخ الاستحقاق",
            termsAndConditions: "الشروط والأحكام",

            // Statuses
            statusSignedActive: "موقع ونشط",
            statusActionRequired: "مطلوب إجراء",
            statusDeclined: "مرفوض",
            statusExpired: "منتهي الصلاحية",

            // E-Sign Modal
            signModalTitle: "منصة التوقيع الرقمي الإلكتروني",
            signerNameLabel: "الاسم القانوني الكامل للموقع *",
            signerNamePlaceholder: "مثال: عبدالله المحروقي",
            drawSignatureLabel: "ارسم توقيعك هنا *",
            clearPad: "مسح التوقيع",
            eSignLegalNotice:
              'بنقرك على "قبول وتوقيع الاتفاقية"، فإنك تقر بأن هذا التوقيع الإلكتروني ملزم قانوناً بموجب لوائح العقود الرقمية الدولية.',
            cancel: "إلغاء",
            acceptAndSign: "قبول وتوقيع الاتفاقية",
          },

          // ترجمة صفحة الدعم والتعديلات
          clientSupport: {
            pageTitle: "الدعم والتعديلات",
            pageSubtitle:
              "هل تحتاج إلى تغيير في التصميم، أو اكتشفت مشكلة فنية، أو لديك استفسار عام؟ افتح تذكرة جديدة أدناه.",
            createNewRequest: "إنشاء طلب جديد",
            requestType: "نوع الطلب",
            types: {
              bug: "🐞 خلل فني",
              revision: "🛠️ تعديل",
              question: "❓ استفسار",
            },
            targetProject: "المشروع المستهدف",
            targetProjectPlaceholder: "مثال: تطبيق متجر إلكتروني",
            subjectSummary: "ملخص الموضوع",
            subjectPlaceholder: "عنوان مختصر لتعديلك أو سؤالك",
            detailedDescription: "الوصف التفصيلي",
            descriptionPlaceholder:
              "اشرح بالتفصيل ما يحتاج إلى تعديل. أضف مراجع أو خطوات تكرار المشكلة إذا كان خللاً فنيًا.",
            priorityLevel: "مستوى الأولوية",
            submitTicket: "إرسال التذكرة",
            submittedTicketsTitle: "تذاكر الدعم المقدمة",
            totalTickets: "الإجمالي {{count}}",
            priorities: {
              low: "أولوية منخفضة",
              medium: "أولوية متوسطة",
              high: "أولوية عالية",
            },
            statuses: {
              pending: "قيد الانتظار",
              in_progress: "قيد التنفيذ",
              resolved: "تم الحل",
            },
            currentClient: "العميل الحالي",
            today: "اليوم",
          },

          // Client Settings
          clientSettings: {
            pageTitle: "إعدادات الحساب والملف الشخصي",
            pageSubtitle: "إدارة بياناتك الشخصية وتفضيلات الحساب.",
            saveSuccess: "تم الحفظ بنجاح!",
            bioOverview: "نبذة تعريفيّة",
            joinedDate: "انضم منذ",

            // Navigation Tabs
            tabProfile: "تعديل الملف الشخصي",
            tabNotifications: "الإشعارات والتنبيهات",
            tabSecurity: "الأمان والحساب",

            // Profile Form
            fullName: "الاسم الكامل",
            email: "البريد الإلكتروني",
            phone: "رقم الهاتف",
            jobTitle: "المسمى الوظيفي",
            companyName: "اسم الشركة",
            city: "المدينة",
            bio: "النبذة التعريفية",

            // Notifications Options
            notificationsTitle: "تفضيلات التنبيهات",
            emailAlerts: "تنبيهات البريد الإلكتروني",
            smsAlerts: "تنبيهات الرسائل النصية SMS",
            projectUpdates: "تحديثات المشاريع",
            invoiceReminders: "تذكيرات الفواتير والمدفوعات",
            marketingEmails: "الرسائل التسويقية والنشرة الإخبارية",

            // Security Options
            securityTitle: "إعدادات الحماية والأمان",
            twoFactorAuth: "المصادقة الثنائية (2FA)",
            loginAlerts: "تنبيهات تسجيل الدخول",

            // Buttons
            saveChanges: "حفظ التغييرات",
          },
        },
      },

      Data: {
        businessData: {
          clients: {
            alex: {
              name: "أليكس مورغان",
              company: "شركة أيبكس للتجارة الإلكترونية",
              jobTitle: "رئيس قسم التكنولوجيا (CTO)",
              bio: "مهندس برمجيات وشغوف ببناء منصات سحابية عالية الأداء وتطوير البرمجيات الحديثة.",
              address: {
                street: "شارع التقنية 42، المجمع التكنولوجي",
                city: "الرياض",
                country: "المملكة العربية السعودية",
              },
            },
            sami: {
              name: "سامي المنصور",
              company: "تصاميم المنصور الإبداعية",
              jobTitle: "المدير الإبداعي",
              bio: "مصمم هويات بصرية وخبير تجربة مستخدم بخبرة تتجاوز 8 سنوات.",
              address: {
                street: "شارع العليا",
                city: "الرياض",
                country: "السعودية",
              },
            },
            sara: {
              name: "سارة الأحمد",
              company: "فانغارد للحلول الذكية",
              jobTitle: "مديرة المشتريات",
              bio: "إدارة شراكات التحول الرقمي وتحليل البرمجيات Enterprise.",
              address: {
                street: "برج أبراج الإمارات",
                city: "دبي",
                country: "الإمارات",
              },
            },
          },
          projects: {
            prj301: {
              name: "منصة التجارة الإلكترونية المتقدمة",
              description:
                "تطوير منصة تجارة إلكترونية متكاملة تعتمد على Headless Architecture مع React وTailwind وNext.js مع نظام دفع ذكي.",
              m1: {
                title: "تخطيط وتصاميم تجربة وواجهة المستخدم (UI/UX)",
                t1: "اعتماد النموذج التفاعلي النهائي على Figma",
                t2: "رسم مسار المستخدم وعملية الشراء السريعة",
                t3: "اختبار سهولة الاستخدام للمتاجر المحمولة",
              },
              m2: {
                title: "تطوير الواجهات الأمامية والربط السحابي",
                t4: "تطوير صفحات المعرض والسلة ولوحة التحكم",
                t5: "تطبيق الوضع الداكن الزجاجي ونظام التنبيهات",
                t6: "دمج بوابات الدفع Stripe وApple Pay",
                t7: "ربط واجهات API المستودعات المباشرة",
              },
              m3: {
                title: "الاختبارات الأمنية والإطلاق الرسمي",
                t8: "فحص الثغرات وتدقيق استجابة السيرفرات",
                t9: "رفع المفهوم على النطاق الرئيسي ونقل البيانات",
              },
              deliv1: "نظام تصميم Figma كاملاً",
              deliv2: "نسخة المعاينة V1.4 Live",
              deliv3: "وثائق API والدليل التقني",
            },
            prj302: {
              name: "تطوير الهوية البصرية وشعار Brand Identity",
              description:
                "تطوير الهوية البصرية الكاملة للشعار ودليل العلامة التجارية ومطبوعات الشركات.",
              m101: {
                title: "شعار الشركة والدليل الإرشادي",
                t101: "تسليم ملفات الشعار المجهّزة للطباعة والويب",
              },
              deliv1: "كتيب دليل الهوية PDF",
              deliv2: "حزمة شعارات ومطبوعات SVG/AI",
            },
          },
          invoices: {
            inv501: {
              projectTitle: "منصة التجارة الإلكترونية - ربط واجهات API",
              item1: "ربط بوابة الدفع Stripe و Apple Pay",
              item2: "تطوير واجهات GraphQL واستجابة السيرفر",
              notes:
                "يرجى تحويل المبلغ قبل تاريخ الاستحقاق لتفادي تعليق خدمات الربط المباشر.",
            },
            inv502: {
              projectTitle: "منصة التجارة الإلكترونية - المرحلة الأولى (UI/UX)",
              item3: "تصميم واجهات المستخدم النموذج التفاعلي Figma",
              item4: "اختبارات تجربة المستخدم وعينات الجوال",
              notes: "تم استلام الدفعة بالكامل شكراً لتعاملكم معنا.",
            },
            inv503: {
              projectTitle: "استشارات أمنية وفحص ثغرات الخادم",
              item5: "فحص أمان واجهات API وتشفير الجلسات",
              notes:
                "فاتورة متأخرة. يرجى المتابعة وسداد المستحقات في أقرب وقت.",
            },
            inv504: {
              projectTitle: "Brand Identity Design",
              item6: "تصميم الهوية البصرية ودليل العلامة التجارية",
            },
            paymentMethods: {
              applePay: "بطاقة ائتمان (Apple Pay)",
              bankTransfer: "تحويل بنكي مباشر",
              online: "دفع إلكتروني مباشر",
            },
          },
          notifications: {
            notif101: {
              title: "العقد الخاص بمشروع Web App جاهز للتوقيع",
              message:
                "تم إرسال العقد النهائي المحدث من قبل الفريق. يرجى المراجعة والتوقيع الإلكتروني للبدء بالإنتاج.",
              actionText: "مراجعة العقد",
            },
            notif102: {
              title: "تم تأكيد عملية الدفع للفاتورة #INV-2026-002",
              message:
                "استلمنا دفعتك بنجاح بمبلغ $3,200.00. تم إرفاق إيصال الدفع في حسابك.",
              actionText: "عرض الفاتورة",
            },
            notif103: {
              title: "تحديث جديد على لوحة التحكم (Version 2.4)",
              message:
                "قمنا بإضافة خاصية شريط التبويبات المفتوحة وسجل النشاطات لتحسين تجربة تصفحك.",
            },
            notif104: {
              title: "تنبيه أمني: تسجيل دخول جديد",
              message:
                "تم تسجيل الدخول إلى حسابك من جهاز macOS في دبي، الإمارات العربية المتحدة.",
              actionText: "إعدادات الأمان",
            },
            notif105: {
              title: "تم الرد على تذكرة الدعم #SUP-889",
              message:
                "قام مهندس الصيانة بإضافة رد جديد بخصوص استفسارك حول ربط الـ API.",
              actionText: "عرض التذكرة",
            },
            time: {
              minsAgo: "منذ 10 دقائق",
              hoursAgo: "منذ ساعتين",
              yesterday: "أمس، 04:30 م",
              daysAgo: "منذ يومين",
              threeDaysAgo: "منذ 3 أيام",
              today: "اليوم",
            },
          },
        },

        centralData: {
          client: {
            fullName: "أليكس مورغان",
            jobTitle: "رئيس قسم التكنولوجيا (CTO)",
            companyName: "شركة أيبكس للتجارة الإلكترونية",
            bio: "مهندس برمجيات وشغوف ببناء منصات سحابية عالية الأداء. أعمل حالياً على تطوير البنية التحتية لمنصات التجارة الرقمية.",
            joinedDate: "15 يناير 2026",
            address: {
              street: "شارع التقنية 42، المجمع التكنولوجي",
              city: "الرياض",
              country: "المملكة العربية السعودية",
              zipCode: "12211",
            },
          },
          projects: {
            proj701: {
              name: "تطبيق التجارة الإلكترونية المتقدم",
              description:
                "منصة تجارة إلكترونية متكاملة تعتمد على Headless Architecture مع React وTailwind وDjango.",
              startDate: "1 يونيو 2026",
              estimatedCompletion: "15 أغسطس 2026",
              milestones: {
                m1Title: "تصميم واجهات المستخدم UI/UX",
                t1Title: "اعتماد النموذج التفاعلي على Figma",
                t2Title: "رسم مسار المستخدم وعملية الشراء",
                m2Title: "تطوير الواجهة الأمامية (React/Tailwind)",
                t3Title: "صفحات الرئيسية والمعرض والسلة",
                t4Title: "تطبيق الوضع الداكن للوحة التحكم",
                t5Title: "ربط واجهات الدفع الإلكتروني",
              },
              deliverables: {
                d1Name: "نظام تصميم Figma",
                d2Name: "نسخة المعاينة V1",
              },
            },
            proj502: {
              name: "تحديث البوابة المؤسسية",
              description:
                "تطوير الموقع التعريفي للشركة لزيادة سرعة التحميل وتحسين محركات البحث.",
              startDate: "10 مايو 2026",
              estimatedCompletion: "10 يوليو 2026",
              deliverables: {
                d1Name: "الرابط الحي للموقع",
              },
            },
          },
          invoices: {
            inv201: {
              projectTitle: "ربط واجهات API وSaaS",
              issuedDate: "10 يوليو 2026",
              dueDate: "28 يوليو 2026",
            },
            inv194: {
              projectTitle: "تطبيق التجارة الإلكترونية (المرحلة الأولى)",
              issuedDate: "15 يونيو 2026",
              dueDate: "30 يونيو 2026",
            },
          },
        },

        clientData: {
          fullName: "أحمد محمود",
          companyName: "شركة التقنية المبتكرة",
          jobTitle: "مدير مشاريع",
          bio: "مطور ومصمم حلول رقمية أمتلك خبرة تتجاوز 8 سنوات في إدارة المشاريع التقنية.",
          address: {
            street: "طريق الملك فهد",
            city: "الرياض",
            country: "المملكة العربية السعودية",
            zipCode: "12211",
          },
        },

        dataStore: {
          services: {
            fullstack: {
              label: "تطوير تطبيقات الويب الكاملة (Full-Stack)",
              desc: "حلول برمجية متكاملة ومخصصة من الصفر باستخدام React و Django مع قواعد بيانات متطورة.",
            },
            saas: {
              label: "تصميم واجهات وأنظمة SaaS & Dashboards",
              desc: "تصميم تجربة واجهة مستخدم (UX/UI) فائقة السلاسة مع لوحات تحكم تفاعلية ومتجاوبة.",
            },
            project_trial: {
              label: "طلب تجربة مشروع برمجي",
              desc: "فرصة لاختبار وتقييم الأنظمة والحلول البرمجية قبل الاعتماد النهائي.",
            },
            frontend: {
              label: "تطوير الواجهات الأمامية (React & TypeScript)",
              desc: "بناء واجهات حديثة وسريعة للغاية مع أداء استثنائي وتوافق تام مع محركات البحث SEO.",
            },
            backend: {
              label: "تطوير البنية الخلفية (Python & Django)",
              desc: "بناء خوادم آمنة وقابلة للتوسع مع ربط قواعد بيانات ومعالجة طلبات معقدة.",
            },
          },
          days: {
            sunday: "الأحد",
            monday: "الإثنين",
            tuesday: "الثلاثاء",
            wednesday: "الأربعاء",
            thursday: "الخميس",
            friday: "الجمعة",
            saturday: "السبت",
          },
          contactMethods: {
            email: "البريد الإلكتروني",
            whatsapp: "واتساب",
            phone: "اتصال هاتفي",
          },
          referralSources: {
            google: "محركات البحث (Google)",
            social: "وسائل التواصل الاجتماعي (LinkedIn/X)",
            recommendation: "توصية من عميل أو صديق",
            portfolio: "معرض الأعمال والمنصات التقنية",
            other: "أخرى",
          },
          consultationTypes: {
            saas: "أنظمة SaaS",
            fullstack: "تطوير ويب متكامل",
            architecture: "معمارية الأنظمة",
            code_review: "مراجعة الكود والأداء",
            other: "استشارات أخرى",
          },
          initialLeads: {
            "LD-9021": {
              fullName: "سالم المعمري",
              companyName: "شركة التقنية للحلول",
              licenseType: "ترخيص مدى الحياة Enterprise",
              description:
                "نبحث عن حل برمجي مخصص لإدارة الفواتير والعملاء مع دعم تجميع المشاريع وتلقي الإشعارات مباشرة.",
              additionalNotes: "يرجى التواصل خلال الفترة الصباحية فقط.",
              notes: {
                "note-1": "تم الاطلاع على الطلب المبدئي وسيتم إرسال عرض السعر.",
              },
            },
            "LD-9022": {
              fullName: "أحمد الفارسي",
              companyName: "استوديو الفضاء الرقمي",
              description:
                "طلب مراجعة وتحديث واجهة مستخدم سحابية الحالية لدعم النمط الزجاجي وتجربة المستخدم الحديثة.",
            },
          },
          initialDemoRequests: {
            "DM-3001": {
              fullName: "فهد العامري",
              companyName: "شركة التقنية العُمانية",
              productOrService: "نظام ERP السحابي",
              notes:
                "نغطي 50 موظفاً ونرغب في تجربة نظام الموارد البشرية والمالية.",
            },
            "DM-3002": {
              fullName: "أسماء الراسبية",
              companyName: "مجموعة الضيافة",
              productOrService: "لوحة تحكم الحجوزات",
              notes: "نرغب بتجربة النظام التجريبي للارتباط مع أنظمتنا الحالية.",
            },
          },
          initialActivityLogs: {
            "LOG-9081": {
              operator: "علي المحروقي",
              action:
                "قام بتحديث إعدادات ترخيص النظام وترقية الحزمة إلى Enterprise",
            },
            "LOG-9082": {
              operator: "نظام الأمان الحماية (System Core)",
              action: "محاولة دخول مشبوهة مكررة تم حظرها تلقائياً",
            },
            "LOG-9083": {
              operator: "سعيد السيابي",
              action:
                "فشل في مزامنة قاعدة البيانات الفرعية مع السيرفر الرئيسي (DB Connection Timeout)",
            },
            "LOG-9084": {
              operator: "أحمد الفارسي",
              action: "تصدير التقرير المالي لشهر أغسطس 2026 بصيغة PDF",
            },
            "LOG-9085": {
              operator: "System CronJob",
              action:
                "التنظيف الدوري للذاكرة التخزينية المؤقتة (Cache Cleaned)",
            },
          },
          initialBookings: {
            "BK-1001": {
              nameOrOrg: "Smart Solutions Co. / علي المحروقي",
              summary:
                "جلسة مناقشة المعمارية البرمجية لواجهة SaaS ومخطط قواعد البيانات وتحديد متطلبات التوسع المستقبلي.",
              adminNotes:
                "تم إرسال رابط الاجتماع عبر Google Meet وتحديد موعد النهائي.",
            },
            "BK-1002": {
              nameOrOrg: "Modern Tech Est. / سعيد السيابي",
              summary:
                "استشارة تقنية حول تحسين أداء واجهة React والربط الفعال مع خلفية النظام المبنية بـ Django.",
            },
            "BK-1003": {
              nameOrOrg: "شركة الأفق الرقمي",
              summary:
                "استعراض النطاق الزمني والتكلفة المتوقعة لتطوير منصة التجارة الإلكترونية المخصصة.",
            },
            "BK-1004": {
              nameOrOrg: "مؤسسة الابتكار التقني",
              summary:
                "مراجعة التصاميم المبدئية للوحة التحكم المباشرة واستكشاف تحسين تجربة المستخدم.",
              adminNotes: "تمت الجلسة بنجاح وتم توفير التوصيات في ملف PDF.",
            },
            "BK-1005": {
              nameOrOrg: "حلول السحاب الذكية",
              summary:
                "طلب إلغاء وتأجيل الاستشارة بخصوص معمارية الخوادم السحابية.",
            },
          },
        },

        portfolioItems: {
          tags: {
            premiumTemplate: "قالب احترافي",
            aiIntegration: "تكامل الذكاء الاصطناعي",
            fintechTemplate: "قالب التقنية المالية",
            adminAnalytics: "لوحة تحكم وتحليلات",
          },
          items: {
            "1": {
              title: "قالب React SaaS",
              version: "(إصدار 2026) - أداء عالي",
              description:
                "قالب صفحة هبوط لمؤسسات SaaS مصمم لشركات البرمجيات والشركات الناشئة. يتميز بتصميم متجاوب، النمط الداكن، تحسين محركات البحث SEO والأداء العالي.",
            },
            "2": {
              title: "منصة لوحة تحكم الذكاء الاصطناعي",
              version: "(إصدار 2026) - التقنية الأساسية",
              description:
                "لوحة تحكم إدارية متقدمة تتميز بمساعدين مدعومين بالذكاء الاصطناعي، ورسوم بيانية مؤتمتة ذكية، ومعالجة فائقة السرعة.",
            },
            "3": {
              title: "محلل البيانات المالية Pro",
              version: "(إصدار 2026) - المؤسسات",
              description:
                "لوحة تحكم محاسبية مالية رفيعة المستوى مصممة للمعاملات العالمية الآمنة، والفلترة المباشرة، وتتبع العملات المتعددة.",
            },
            "4": {
              title: "قالب لوحة تحكم الحسين الاحترافي",
              version: "(إصدار 2026) - Enterprise",
              description:
                "لوحة تحكم إدارية ذات أداء عالي ونمط داكن مخصصة لأنظمة SaaS و أنظمة CRM وتحليلات البيانات. مزودة برسوم بيانية متجاوبة وجداول بيانات ديناميكية.",
            },
          },
        },
        // --- ترجمة آراء العملاء ---
        testimonialsItems: {
          "TEST-101": {
            role: "الرئيس التنفيذي للتقنية",
            content:
              "ساعدتنا لوحة تحكم الذكاء الاصطناعي في تحسين رؤية بياناتنا البرمجية خلال أيام. الاهتمام بتفاصيل الواجهة وهندسة الكود المضيئة أذهلتنا.",
          },
          "TEST-102": {
            role: "مديرة المنتجات",
            content:
              "معمارية التصميم الداكن رائعة وتعمل بسلاسة متناهية على جميع الشاشات. قللت وقت دمج الواجهات لشركتنا بأكثر من النصف.",
          },
          "TEST-103": {
            role: "قائد فريق المهندسين",
            content:
              "التصميم الزجاجي (Glassmorphic) والتفاعلات الدقيقة تمنح هذا القالب طابعًا فخمًا للغاية. أوصي به بشدة لمنتجات SaaS الحديثة.",
          },
        },

        proposalsData: {
          statuses: {
            draft: "مسودة",
            pending: "قيد الانتظار",
            accepted: "مقبول",
            declined: "مرفوض",
            expired: "منتهي الصلاحية",
          },
          documentTypes: {
            proposal: "عرض سعر",
            contract: "عقد",
          },
          items: {
            "PROP-2026-001": {
              title: "منصة تجارة إلكترونية وحزمة لوحة تحكم إدارية",
              projectTitle: "نظام إدارة تجارة التجزئة للمؤسسات",
              companyName: "شركة الحلول المتقدمة",
              scopeOfWork: [
                "تصميم واجهات بتصميم داكن وأداء فائق باستعمال React وTypeScript وTailwind CSS.",
                "تطوير لوحة تحكم إدارية لحظية تحتوي على تحليلات ومؤشرات أداء متقدمة.",
                "بوابة خدمة ذاتية للعملاء لتتبع المشاريع، الفواتير التلقائية، والتوقيع الإلكتروني.",
                "ربط خلفية نظام قابلة للتوسع باستخدام Django REST Framework مع PostgreSQL وRedis.",
              ],
              deliverables: [
                "مستودع كود جاهز للإنتاج على GitHub Enterprise يحوي React وDjango.",
                "إعداد خطوط التجميع CI/CD وتكامل SSL وبنية AWS السحابية.",
                "توثيق برمجيات OpenAPI شامل وأدلة إرشادية للمستخدم النهائي.",
              ],
              milestones: {
                m1: "دفعة مقدمة لضمان المشروع",
                m2: "تسليم المرحلة الأولى للوحة التحكم الأساسية",
                m3: "التسليم النهائي والإطلاق",
              },
              paymentTerms:
                "40% دفعة مقدمة عند التوقيع الرقمي، 30% بعد تسليم المرحلة الأولى، و30% عند الإطلاق النهائي.",
              notes:
                "يتضمن 6 أشهر من الدعم الفني المتميز بعد الإطلاق، ومراقبة السيرفرات 24/7، وإصلاح الأخطاء مجاناً.",
              activityLogs: {
                l1: "تم إنشاء المستند وتحويله إلى مسودة",
                l2: "تم إصدار المستند وإرساله للعميل",
                l3: "تم عرض المستند من قبل العميل",
              },
            },
            "CNT-2026-002": {
              title: "تحسين أداء التطبيقات عالية الكثافة وقواعد البيانات",
              projectTitle: "تحديث وتطوير البنية التحتية الخلفية",
              companyName: "شركة نكسا ديزاين العالمية",
              scopeOfWork: [
                "تحسين الاستعلامات المعقدة لـ Django ORM وحل مشكلات الأداء N+1.",
                "تطبيق التخزين المؤقت Edge Caching شبكات CDN وخطوط ضغط الأصول.",
                "تحقيق درجة 95+ في اختبار Google Lighthouse وتقليل سرعة التحميل الأول ليكون أقل من 0.8 ثانية.",
              ],
              deliverables: [
                "تقارير تفاعلية لتدقيق الأداء (مقارنة قبل وبعد التحسين).",
                "دمج الكود المباشر في بيئة الإنتاج وتطبيق الفهارس بدون توقف الخدمة.",
              ],
              milestones: {
                m1: "التدقيق الشامل للأداء والتعديلات النهائية",
              },
              paymentTerms:
                "100% الدفع عند التنفيد الناجح وتقديم تقارير التدقيق المعتمدة.",
              activityLogs: {
                l1: "تم كتابة مسودة العقد",
                l2: "تم توقيع العقد رقمياً",
              },
            },
            "PROP-2026-003": {
              title: "تطبيق جوال للتنبيهات والإشعارات اللحظية",
              projectTitle: "تطبيق محرك الإشعارات اللوجستية",
              companyName: "فيلوتشي اللوجستية",
              scopeOfWork: [
                "هندسة واجهات التطبيق متعدد المنصات باستخدام React Native وExpo.",
                "تكامل WebSockets للتنبيهات الفورية والتتبع اللحظي.",
              ],
              deliverables: [
                "حزم جاهزة للنشر على App Store و Google Play (.APK و .IPA).",
              ],
              paymentTerms: "50% دفعة مقدمة لبدء عمليات التطوير.",
              activityLogs: {
                l1: "تم إصدار عرض السعر",
                l2: "انتهت صلاحية العرض تلقائياً",
              },
            },
          },
          storeLogs: {
            statusUpdated: "تم تحديث الحالة إلى {{status}}",
            byUser: " بواسطة {{user}}",
            documentCreated: "تم إنشاء المستند",
            defaultUser: "النظام / المسؤول",
          },
        },

        support: {
          filters: {
            all: "جميع أنواع التذاكر",
            revision: "تعديلات النطاق",
            bug: "أخطاء برمجية",
            question: "استفسارات العملاء",
          },
          priorities: {
            low: "منخفضة - جدول زمني مرن",
            medium: "متوسطة - استجابة قياسية",
            high: "عالية - يعطل الاختبار/الإنتاج",
          },
          statuses: {
            pending: "قيد الانتظار",
            in_progress: "قيد التنفيذ",
            resolved: "تم الحل",
          },
          tickets: {
            tk402: {
              subject: "تغيير التدرج اللون لزر الدفع",
              description:
                "نحتاج إلى تغيير لون زر الدفع الرئيسي ليتوافق مع هوية العلامة التجارية الجديدة (تدرج زمردي بدلاً من النيلي).",
            },
            tk391: {
              subject: "فشل الـ Webhook عند التعامل مع بيانات معينة",
              description:
                "واجهة البرمجة تُرجع خطأ 500 عندما تحتوي مصفوفة البيانات الإضافية على عناصر متداخلة. يتطلب فحص عاجل.",
            },
            tk310: {
              subject: "استفسار حول المدة الزمنية لنقل الدومين",
              description:
                "كم تستغرق عادة مدة انتشار الـ DNS لإعدادات التوجيه الجديدة؟",
            },
          },
        },
      },
    },
  },
};



i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ar",
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
