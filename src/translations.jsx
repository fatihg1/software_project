const translations = {
    en: {
        //homepage
        admin: "Admin",
        manager: "Manager",
        english: "English",
        turkish: "Turkish",
        welcome: "Explore Turkey with Rail Link",
        landingMessage: "Book your train tickets fast, easy, and hassle-free – your journey starts here!",
        about: "About Us",
        contact: "Contact",
        buyTickets: "Buy Tickets",
        stationCenter: "Station Center",
        helpCenter: "Help Center",
        bookTickets: "Book Tickets",
        myTickets: "My Tickets",
        oneWay: "One Way",
        roundTrip: "Round Trip",
        departure: "From",
        arrival: "To",
        departureStation: "Departure Station",
        arrivalStation: "Arrival Station",
        departureDate: "Departure Date",
        returnDate: "Return Date",
        today: "Today",
        tomorrow: "Tom.",
        same: "Same",
        next: "Next",
        homeSearch: "Search for Trains",
        ticketId: "Ticket ID",
        lastname: "Last Name",
        enterTicketId: "Enter Your Ticket Number",
        enterLastName: "Enter Your Last Name",
        findMyTickets: "Find My Tickets",
        stationResult: "No station found",
        poplularRoutes: "Popular Routes",
        findTrains: "Find Available Trains",
        swapStations: "Swap Stations",
        routeOne: "Ankara to Istanbul",
        routeTwo: "Istanbul to Izmir",
        routeThree: "Izmir to Bursa",
        routeFour: "Antalya to Konya",
        routeFive: "Konya to Antalya",
        routeSix: "Eskişehir to Ankara",
        weather: "Daily Weather",
        //dailyWeather içindeki text türkçe yapılabilir mi
        loading: "Weather Data Loading...",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        weatherError: "Unable to receive weather data!",
        announcements: "Latest Announcements",
        trainTicketBooking: "Train Ticket Booking",
        footerText: "The easiest way to book train tickets with secure payment and 24/7 customer support. Travel smarter with us." ,
        quickLinks: "Quick Links",
        home: "Home",
        noAnnouncements: "No current announcements",
        faqs: "FAQs",
        rules: "Passenger Guidelines",
        contactUs: "Contact Us",
        address:"Maslak District, Büyükdere Avenue, No:237 Sarıyer, 34485 Istanbul, Turkey",
        email: "Email: info@RailLink.com",
        phone: "Phone: +90 555 123 4567",
        rightsReserved: "© 2025 Rail Link. All rights reserved.",

        //hamburger menu
        hamburgerText:"Sign in to access all features",
        signIn:"Sign In",
        hamburgerRightsReserved:"© 2025 Rail Link",

        //buyTickets
        findTrain: "Find Your Train",
        selectDeparture: "Select Departure",
        selectReturn: "Select Destination",
        findTrainText: "Search and book train tickets across Turkey",
        selectDeparture: "Select Departure",
        selectReturn: "Select Destination",
        outboundDate: "Outbound Date",
        searchTrains: "Search Trains",
        noTrainFound: "No outbound trains found",
        noTrainFoundText: "Try adjusting your search criteria",
        continueBooking:"Continue to Booking",
        trainSelection: "Train Selection",
        selectJourney: "Select Your Journey",
        seatSelection: "Seat Selection",
        chooseSeat: "Choose Your Seat",
        paymentDetails: "Payment Details",
        completePayment: "Complete Your Payment",
        outboundDate: "Outbound Date",
        returnDate: "Return Date",
        searching: "Searching...",
        searchTrains: "Search Trains",
        outboundFound: "outbound trains found",//durak ismi entegre etme
        returnFound: "return trains found",//durak ismi entegre etme
        searchForTrains: "Searching for trains...",
        noOutboundFound: "No outbound trains found",
        tryAdjusting: "Try adjusting your search criteria",
        continueBooking:"Continue to Booking",
        seatsLeft: "Only {count} seats left!",
        seatsAvailable: "{count} seats available",
        currencySymbol: "$",
        hoursAbbr: "h",
        minutesAbbr: "m",
        from: "from",
        to: "to",
        on: "on",
        validationError: "Please select at least a departure or arrival station",
        steps: [
            { id: 'train-selection', number: 1, title: 'Train Selection', subtitle: 'Select your journey' },
            { id: 'seat-selection', number: 2, title: 'Seat Selection', subtitle: 'Choose your seat' },
            { id: 'payment', number: 3, title: 'Payment Details', subtitle: 'Complete payment' },
          ],
        direct: "Direct",
        //select seats
        selectSeatsRoundTrip: "Select Seats for Round Trip",
        selectSeatsSingle: "Select Your Seats",
        outboundTrain: "Outbound Train",
        returnTrain: "Return Train",
        selectedSeats: "Selected Seats",
        outboundSeats: "Outbound Train Seats",
        returnSeats: "Return Train Seats",
        noSeatsSelected: "No seats selected",
        wagonSeat: "Wagon {wagon}, Seat {seat}",
        backButton: "Back",
        continueToPayment: "Continue to Payment",
        seatSelectionError: "Please select the same number of seats for both outbound and return trains",
        errorPagePath: "/error",
        wagonTypes: {
        business: "Business",
        economy: "Economy",
        sleeper: "Sleeper",
        lodge: "Lodge"
        },
        wagon: "Wagon",
        seatsLeft: "{count} seats left",

         // Payment
    paymentDetails: "Payment Details",
    cardNumber: "Card Number",
    cardNumberPlaceholder: "1234 5678 9012 3456",
    cardNumberRequired: "Card number is required",
    cardNumberInvalid: "Card number should be 16 digits",
    cardHolder: "Card Holder",
    cardHolderRequired: "Card holder name is required",
    expiryDate: "Expiry Date",
    expiryDateRequired: "Expiry date is required",
    expiryDateInvalid: "Use format MM/YY",
    cvv: "CVV",
    cvvRequired: "CVV is required",
    cvvInvalid: "CVV should be 3 or 4 digits",
    emailConfirmation: "Email for Confirmation",
    emailInvalid: "Email is invalid",
    payNow: "Pay Now ${amount}",
    cancel: "Cancel",
    
    // Passenger Info
    passengerInformation: "Passenger Information",
    firstName: "First Name",
    firstNameRequired: "First name is required",
    surname: "Surname",
    surnameRequired: "Surname is required",
    governmentId: "Government ID",
    governmentIdInvalid: "Valid 11-digit government ID is required",
    phoneNumber: "Phone Number",
    phoneNumberInvalid: "Valid phone number is required",
    birthDate: "Birth Date",
    birthDateInvalid: "Invalid birth date format (DD/MM/YYYY)",
    termsAgreement: "I agree to the ",
    termsAndConditions: "terms and conditions",
    termsAgreementError: "You must agree to the terms before proceeding",
    totalPrice: "Total Ticket Price",
    proceedToPayment: "Proceed to Payment",
    outboundLabel: "Outbound",
    returnLabel: "Return",
    // Trip Types
    roundTrip: "Round Trip",
    oneWayTrip: "One Way Trip",
    passenger: "Passenger {number}",
    
    // Seat Info
    wagonSeat: "Wagon {wagon}, Seat {seat}",
    seat: "Seat",

    // Terms and Conditions
    termsAndConditions: "Terms and Conditions",
    close: "Close",
    termsSections: [
      {
        heading: "Ticket Purchase and Booking",
        content: "By completing your booking through our service, you enter into a binding agreement with the railway operator. All tickets are subject to the specific terms of the selected fare and the general conditions of carriage established by the relevant railway company."
      },
      {
        heading: "Ticket Validity",
        content: "All tickets are valid only for the specified journey, date, and train service indicated at the time of purchase. Tickets are non-transferable and must be used by the passenger named on the booking unless explicitly stated otherwise. Digital tickets must be presented on a functioning device or as a printed copy with a clearly legible QR code or barcode."
      },
      {
        heading: "Pricing and Payment",
        content: "All prices displayed include applicable taxes and fees unless otherwise stated. Payment must be made in full at the time of booking using one of our accepted payment methods. We reserve the right to change prices at any time before booking confirmation."
      },
      {
        heading: "Cancellations and Refunds",
        content: "Refund eligibility depends on the ticket type purchased. Non-refundable tickets cannot be exchanged for cash. Refundable tickets may be subject to an administrative fee. All refund requests must be submitted at least 24 hours before the scheduled departure time through our customer service channels."
      },
      {
        heading: "Changes to Bookings",
        content: "Changes to flexible tickets may be made subject to availability and any applicable fare difference. Changes to restricted tickets may not be permitted or may incur additional charges as specified at the time of purchase. All booking changes must be made before the scheduled departure."
      },
      {
        heading: "Passenger Responsibilities",
        content: "Passengers are responsible for arriving at the station with sufficient time before departure. All passengers must comply with railway regulations and staff instructions. Failure to present a valid ticket may result in penalty fares or removal from the train."
      },
      {
        heading: "Privacy and Data Protection",
        content: "Personal information collected during the booking process is used solely for processing your transaction and providing the requested service. We adhere to applicable data protection laws and our Privacy Policy, which can be accessed on our website."
      },
      {
        heading: "Liability",
        content: "Our liability is limited to the value of the tickets purchased. We are not liable for consequential losses or delays beyond our reasonable control including but not limited to strikes, technical failures, severe weather conditions, or actions by third parties."
      },
      {
        heading: "Customer Service",
        content: "For assistance with bookings, refunds, or general inquiries, please contact our customer service team using the contact information provided on our website. Response times may vary depending on inquiry volume."
      },
      {
        heading: "Governing Law",
        content: "These terms and conditions are governed by and construed in accordance with applicable laws. Any disputes shall be subject to the exclusive jurisdiction of the relevant courts."
      }
    ],
    trainRulesTitle: "Train Ticketing Rules",
    rulesButton: "Train Rules",
    closeButton: "Close",
    trainRules: {
      sales: {
        title: "Sales Rules",
        content: `• Tickets must be purchased at least 30 minutes before departure. Purchased tickets are non-transferable and subject to cancellation/refund policies.

• All passengers are required to carry valid identification that matches the name on their ticket. 
  - Children under 12 years of age must be accompanied by an adult with a valid ticket.
  - International travelers must present passport or equivalent identification.

• Discount options:
  - Advance purchase: 10-25% discount for tickets bought at least 14 days before departure.
  - Group discounts: Apply to groups of 10 or more passengers traveling together.
  - Special rates: Senior citizens (65+) and students with valid ID cards are eligible for a 15% discount.

• Ticket verification:
  - E-tickets must be either printed or available on a mobile device.
  - The company reserves the right to refuse service to passengers without proper ticket verification.
  - Season tickets are available for regular travelers and offer significant savings.`
      },
      transactions: {
        title: "Ticket Transactions",
        content: `• Ticket changes and cancellations should be made at station counters or online at least 2 hours before departure.

• Refund policy:
  - More than 24 hours before departure: 90% refund
  - Between 24 and 2 hours before departure: 50% refund
  - Less than 2 hours before departure: No refund
  - No-shows: No refund

• Modification fees:
  - Route changes: 10% of the original ticket price
  - Date changes (same route): 5% fee if made more than 24 hours in advance
  - Class upgrades: Difference between fares plus administrative fee

• Lost or damaged tickets:
  - Lost tickets: Can be reissued at station counters for a fee with proof of purchase
  - Damaged tickets: Replaced free of charge when the original ticket is surrendered
  - Digital tickets: Can be transferred to a new device through the official mobile application`
      },
      luggage: {
        title: "Hand Luggage Rules",
        content: `• Each passenger can carry up to 15 kg of hand luggage with dimensions of 55x40x20 cm.

• Storage requirements:
  - All luggage must be properly secured in designated areas or overhead racks
  - Oversized items must be checked in as registered luggage (additional fee applies)
  - Special items like musical instruments require advance arrangements

• Passenger responsibility:
  - Travelers are solely responsible for their hand luggage and personal belongings
  - The railway company assumes no liability for loss or damage unless caused by staff
  - Valuable items should remain with passengers at all times

• Prohibited items:
  - Flammable substances and compressed gases
  - Corrosive materials and explosive devices
  - Firearms, ammunition, and weapons
  - Toxic substances and hazardous chemicals
  - Items that may endanger passenger safety

• Electronic devices:
  - Laptops, tablets, and mobile phones are permitted
  - Must be used according to on-board regulations
  - Some trains provide dedicated storage for larger electronics`
      },
      pets: {
        title: "Pet Rules",
        content: `• Small pets (under 8 kg) must be carried in a pet carrier.

• Small pet requirements:
  - Well-ventilated carrier not exceeding 45x30x25 cm
  - Must be placed under seat or in non-obstructive area
  - Pet ticket required (50% of standard adult fare)
  - Maximum two small pets per passenger

• Medium-sized dogs (8-20 kg):
  - Must be on leash and wearing a muzzle
  - Full-price pet ticket required
  - Owner must maintain control at all times
  - Not permitted to occupy passenger seats

• Large animals (over 20 kg):
  - Transport only in designated pet wagons on select trains
  - Advance booking essential (minimum 48 hours)
  - Special transport documents required
  - Additional handling fee applies

• Exceptions and special cases:
  - Guide dogs: Travel free of charge and exempt from muzzle requirements
  - Service animals: Must have proper certification and identification
  - Exotic, farm, and wild animals: Not permitted regardless of size

• Health requirements:
  - Up-to-date vaccination certificates mandatory
  - May be requested by train personnel at any time
  - Animals causing disturbance may be removed from train`
      },
      bicycles: {
        title: "Bicycle Rules",
        content: `• Foldable bicycles are considered hand luggage and do not require additional tickets.

• Foldable bicycle requirements:
  - Must be properly folded in protective carrying case
  - Maximum dimensions: 80x60x40 cm
  - Stored in regular luggage areas
  - No additional fee or reservation required

• Standard bicycles:
  - Require special bicycle ticket
  - Must be transported in designated bicycle compartments
  - Limited availability on high-speed services
  - Advance reservation strongly recommended

• Reservation process:
  - Book up to 2 months in advance
  - Available through station offices, phone, or website
  - Required during peak season (April-September)
  - Subject to availability on specific trains

• Electric bicycles:
  - Permitted with removable batteries
  - Battery must be carried separately as hand luggage
  - Must comply with safety standards
  - Battery capacity should not exceed 300Wh

• Special cases:
  - Tandem bicycles: Limited acceptance, subject to space
  - Cargo bikes: Generally not permitted
  - Bicycles with trailers: Accepted only on specific trains
  - Racing bicycles: Standard rules apply`
      },
      strollers: {
        title: "Baby Stroller Rules",
        content: `• Baby strollers can be transported free of charge but must be foldable.

• Boarding and movement:
  - Strollers should be folded during embarkation and disembarkation
  - Fold when moving through train corridors
  - May be unfolded if space permits and no obstruction is caused
  - Priority boarding available upon request

• Storage options:
  - Crowded trains: Must be stored in luggage areas or under seats
  - Less crowded services: May use wheelchair spaces if not needed by wheelchair users
  - Wheelchair users always have priority for designated spaces
  - Must never block emergency exits or corridors

• Security considerations:
  - Remove valuable accessories when possible
  - Railway not liable for damage or theft
  - Secure stroller properly when stored
  - Take personal items with you when leaving your seat

• Special stroller types:
  - Twin/tandem strollers: Permitted but may be difficult to accommodate
  - Off-peak travel recommended for multiple strollers
  - Motorized strollers: May require special arrangements
  - Oversized strollers (exceeding 100x70x40 cm when folded): May be refused`
      }
    },
    passengerGuidelines: "Passenger Guidelines",
    subtitle: "Ensuring a safe and comfortable journey for all",
    guidelines: {
      pggeneralInfo: {
        title: "General Information",
        items: [
          "All passengers must have a valid ticket before boarding.",
          "Tickets are non-refundable unless specified otherwise.",
          "Food and beverages may be consumed onboard, but please dispose of waste properly.",
          "Passengers should be seated in their assigned carriages."
        ]
      },
      pgluggagePolicy: {
        title: "Luggage Policy",
        items: [
          "Each passenger is allowed up to 2 pieces of luggage.",
          "Larger luggage must be stored in designated compartments.",
          "Sharp objects and hazardous materials are prohibited."
        ]
      },
      pgbehaviorSafety: {
        title: "Behavior and Safety",
        items: [
          "Passengers should remain seated during the journey.",
          "Smoking is strictly prohibited on the train.",
          "Alcohol may only be consumed in moderation and in designated areas.",
          "In case of an emergency, follow the instructions of the train staff."
        ]
      },
      pgarrivalDeparture: {
        title: "Arrival & Departure",
        items: [
          "Be sure to arrive at least 15 minutes before departure.",
          "Once the train has arrived at the station, passengers are to disembark in an orderly fashion.",
          "If you miss your train, contact the ticket counter for possible rescheduling options."
        ]
      }
    },
    stationCenterDetail: {
        title: "Station Center",
        subtitle: "Search for train routes by station name",
        searchPlaceholder: "Enter station name",
        noResults: 'No train routes found for "{query}"',
        resultsTitle: "Train Routes via {station}",
        resultsCount: "{count} routes found",
        durationLabel: "Duration",
        departureLabel: "Departure",
        arrivalLabel: "Arrival",
        routeLabel: "Route"
      },
      helpCenterD: {
        title: "Appeal Help Center",
        subtitle: "Submit your appeal",
        appealType: "Appeal Type",
        selectType: "Select Appeal Type",
        appealTypes: {
          Refund: "Refund",
          Complaint: "Complaint",
          Suggestion: "Suggestion",
          Appreciation: "Appreciation"
        },
        contactInfo: {
          title: "Contact Information",
          fields: {
            name: "Name",
            surname: "Surname",
            phoneNumber: "Phone Number",
            email: "Email Address"
          }
        },
        travelInfo: {
          title: "Travel Information",
          fields: {
            ticketId: "Ticket ID",
            departureStation: "Departure Station",
            arrivalStation: "Arrival Station"
          }
        },
        appealContent: "Content of the Appeal",
        appealContentPlaceholder: "Describe your appeal in detail",
        submitButton: "Submit Appeal",
        success: {
          title: "Appeal Submitted Successfully!",
          numberLabel: "Your Appeal Number",
          note: "Please save this number for future reference."
        }
      },
    },
    tr: {
        //navbar
        buyTickets: "Bilet Al",
        about: "Hakkımızda",
        contact: "İletişim",
        stationCenter: "İstasyonlar",
        helpCenter: "Yardım Merkezi",
        //homepage
        admin: "Admin",
        manager: "Müdür",
        english: "English",
        turkish: "Türkçe",
        welcome: "Türkiye'yi Rail Link ile Keşfedin",
        landingMessage: "Biletlerinizi hızlı, kolay ve sorunsuz bir şekilde alın - yolculuğunuz burada başlıyor!",
        stationResult: "İstasyon bulunamadı",
        bookTickets: "Bilet Al",
        myTickets: "Biletlerim",
        oneWay: "Tek Yön",
        roundTrip: "Gidiş-Dönüş",
        departure: "Nereden",
        arrival: "Nereye",
        departureStation: "Ayrılış İstasyonu",
        arrivalStation: "Varış İstasyonu",
        departureDate: "Ayrılış Tarihi",
        returnDate: "Dönüş Tarihi",
        today: "Bugün",
        tomorrow: "Yarın",
        same: "Aynı",
        next: "Sonraki",
        homeSearch: "Trenleri Ara",
        ticketId: "Bilet Numarası",
        lastname: "Soyad",
        placeholderDeparture: "Ayrılış İstasyonu",
        placeholderArrival: "Varış İstasyonu",
        enterTicketId: "Bilet Numaranızı Girin",
        enterLastName: "Soyadınızı Girin",
        findMyTickets: "Biletlerimi Bul",
        poplularRoutes: "Sık Kullanılan Rotalar",
        findTrains: "Uygun trenleri bul",
        swapStations: "İstasyonları Değiştir",
        routeOne: "Ankara'dan İstanbul'a",
        routeTwo: "İstanbul'dan İzmir'e",
        routeThree: "İzmir'den Bursa'ya",
        routeFour: "Antalya'dan Konya'ya",
        routeFive: "Konya'dan Antalya'ya",
        routeSix: "Eskişehir'den Ankara'ya",
        weather: "Hava Durumu",
        humidity: "Nem",
        windSpeed: "Rüzgar Hızı",
        weatherError: "Şu anda hava durumu verileri alınamıyor!",
        loading: "Hava Durumu Verileri Yükleniyor...",
        announcements: "Güncel Duyurular",
        noAnnouncements: "Güncel duyuru yok",
        trainTicketBooking: "Tren Bilet Rezervasyonu",
        footerText: "Güvenli ödeme ve 7/24 müşteri desteği ile bilet almak için en kolay yol. Bizimle daha akıllı seyahat edin." ,
        quickLinks: "Hızlı Bağlantılar",
        home: "Anasayfa",
        faqs: "SSS",
        rules: "Yolcu Kuralları",
        contactUs: "Bize Ulaşın",
        address:"Maslak District, Büyükdere Avenue, No:237 Sarıyer, 34485 Istanbul, Turkey",
        email: "Email: info@RailLink.com",
        phone: "Telefon: +90 555 123 4567",
        rightsReserved: "© 2025 Rail Link. Tüm hakları saklıdır.",
    
        //buyTickets
        steps: [
            { id: 'train-selection', number: 1, title: 'Tren Seçimi', subtitle: 'Yolculuğunuzu seçin' },
            { id: 'seat-selection', number: 2, title: 'Koltuk Seçimi', subtitle: 'Koltuk seçin' },
            { id: 'payment', number: 3, title: 'Ödeme Detayları', subtitle: 'Ödemeyi tamamlayın' },
          ],
        direct: "Direkt",
        findTrain: "Treninizi Bulun",
        selectDeparture: "Gidiş Seçin",
        selectReturn: "Dönüş Seçin",
        findTrainText: "Türkiye genelinde tren biletlerini arayın ve satın alın",
        outboundDate: "Gidiş Tarihi",
        returnDate: "Dönüş Tarihi",
        searching: "Aranıyor...",
        searchTrains: "Trenleri Ara",
        outboundFound: "gidiş treni bulundu.",//durak ismi entegre etme
        returnFound: "dönüş treni bulundu.",//durak ismi entegre etme
        searchForTrains: "Trenler aranıyor...",
        noOutboundFound: "Gidiş treni bulunamadı",
        noTrainFoundText: "Arama kriterlerinizi ayarlamayı deneyin",
        tryAdjusting: "Arama kriterlerinizi ayarlamayı deneyin",
        continueBooking:"Rezervasyona Devam Et",
        seatsLeft: "Sadece {count} koltuk kaldı!",
        seatsAvailable: "{count} koltuk müsait",
        currencySymbol: "₺",
        hoursAbbr: "sa",
        minutesAbbr: "dk",
        from: "",
        to: "'dan",
        on: "'ya Tarih:",
        validationError: "Lütfen en az bir kalkış veya varış istasyonu seçin",
    
        //select seats
        selectSeatsRoundTrip: "Gidiş-Dönüş Koltuk Seçimi",
        selectSeatsSingle: "Koltuk Seçiniz",
        outboundTrain: "Gidiş Treni",
        returnTrain: "Dönüş Treni",
        selectedSeats: "Seçilen Koltuklar",
        outboundSeats: "Gidiş Treni Koltukları",
        returnSeats: "Dönüş Treni Koltukları",
        noSeatsSelected: "Seçili koltuk yok",
        wagonSeat: "Vagon {wagon}, Koltuk {seat}",
        backButton: "Geri",
        continueToPayment: "Ödemeye Geç",
        seatSelectionError: "Lütfen gidiş ve dönüş trenleri için aynı sayıda koltuk seçin",
        errorPagePath: "/hata",
        wagon: "Vagon",
    seatsLeft: "{count} koltuk kaldı",
        wagonTypes: {
        business: "Business",
        economy: "Ekonomi",
        sleeper: "Yataklı",
        lodge: "Kuşet"
        },
        // Payment
    paymentDetails: "Ödeme Detayları",
    cardNumber: "Kart Numarası",
    cardNumberPlaceholder: "1234 5678 9012 3456",
    cardNumberRequired: "Kart numarası gereklidir",
    cardNumberInvalid: "Kart numarası 16 haneli olmalıdır",
    cardHolder: "Kart Sahibi",
    cardHolderRequired: "Kart sahibi adı gereklidir",
    expiryDate: "Son Kullanma Tarihi",
    expiryDateRequired: "Son kullanma tarihi gereklidir",
    expiryDateInvalid: "AA/YY formatını kullanın",
    cvv: "CVV",
    cvvRequired: "CVV gereklidir",
    cvvInvalid: "CVV 3 veya 4 haneli olmalıdır",
    emailConfirmation: "Onay İçin E-posta",
    emailInvalid: "Geçersiz e-posta adresi",
    payNow: "Şimdi Öde ${amount}",
    cancel: "İptal",
    
    // Passenger Info
    passengerInformation: "Yolcu Bilgileri",
    firstName: "Ad",
    firstNameRequired: "Ad gereklidir",
    surname: "Soyad",
    surnameRequired: "Soyad gereklidir",
    governmentId: "TC Kimlik No",
    governmentIdInvalid: "Geçerli 11 haneli TC kimlik numarası gereklidir",
    phoneNumber: "Telefon Numarası",
    phoneNumberInvalid: "Geçerli telefon numarası gereklidir",
    birthDate: "Doğum Tarihi",
    birthDateInvalid: "Geçersiz doğum tarihi formatı (GG/AA/YYYY)",
    termsAgreement: "Şartları kabul ediyorum ",
    termsAndConditions: "kullanım koşullarını",
    termsAgreementError: "Devam etmek için şartları kabul etmelisiniz",
    totalPrice: "Toplam Bilet Ücreti",
    proceedToPayment: "Ödemeye Geç",
    outboundLabel: "Gidiş",
    returnLabel: "Dönüş",
    // Trip Types
    roundTrip: "Gidiş-Dönüş",
    oneWayTrip: "Tek Yön",
    passenger: "Yolcu {number}",
    
    // Seat Info
    wagonSeat: "Vagon {wagon}, Koltuk {seat}",
    seat: "Koltuk",
    termsAndConditions: "Kullanım Koşulları",
    close: "Kapat",
    termsSections: [
      {
        heading: "Bilet Satın Alma ve Rezervasyon",
        content: "Hizmetimiz aracılığıyla rezervasyonunuzu tamamlayarak demiryolu operatörü ile bağlayıcı bir anlaşma yapmış olursunuz. Tüm biletler seçilen ücretin özel koşullarına ve ilgili demiryolu şirketi tarafından belirlenen genel taşıma koşullarına tabidir."
      },
      {
        heading: "Bilet Geçerliliği",
        content: "Tüm biletler yalnızca satın alma sırasında belirtilen seyahat, tarih ve tren hizmeti için geçerlidir. Biletler devredilemez ve açıkça belirtilmediği sürece rezervasyonda adı geçen yolcu tarafından kullanılmalıdır. Dijital biletler çalışan bir cihazda veya okunaklı QR kodu/barkod içeren basılı bir kopya olarak sunulmalıdır."
      },
      {
        heading: "Fiyatlandırma ve Ödeme",
        content: "Gösterilen tüm fiyatlara aksi belirtilmedikçe geçerli vergi ve ücretler dahildir. Ödeme, rezervasyon sırasında kabul edilen ödeme yöntemlerinden biri kullanılarak tam olarak yapılmalıdır. Rezervasyon onayından önce fiyatları değiştirme hakkını saklı tutarız."
      },
      {
        heading: "İptal ve İadeler",
        content: "İade uygunluğu satın alınan bilet türüne bağlıdır. İadesiz biletler nakde çevrilemez. İadesiz biletler idari ücrete tabi olabilir. Tüm iade talepleri planlanan kalkış saatinden en az 24 saat önce müşteri hizmetleri kanallarımız aracılığıyla iletilmelidir."
      },
      {
        heading: "Rezervasyon Değişiklikleri",
        content: "Esnek biletlerde değişiklikler, uygunluk ve varsa ücret farkına tabi olarak yapılabilir. Kısıtlı biletlerde değişikliklere izin verilmeyebilir veya satın alma sırasında belirtilen ek ücretler uygulanabilir. Tüm rezervasyon değişiklikleri planlanan kalkış saatinden önce yapılmalıdır."
      },
      {
        heading: "Yolcu Sorumlulukları",
        content: "Yolcular, kalkıştan önce yeterli sürede istasyona varmaktan sorumludur. Tüm yolcular demiryolu düzenlemelerine ve personel talimatlarına uymalıdır. Geçerli bir bilet sunulamaması cezai ücretlendirme veya trenden çıkarılma ile sonuçlanabilir."
      },
      {
        heading: "Gizlilik ve Veri Koruma",
        content: "Rezervasyon sürecinde toplanan kişisel bilgiler yalnızca işleminizin gerçekleştirilmesi ve talep edilen hizmetin sağlanması için kullanılır. Web sitemizde bulunan Gizlilik Politikamız ve ilgili veri koruma yasalarına uygun hareket ederiz."
      },
      {
        heading: "Sorumluluk",
        content: "Sorumluluğumuz satın alınan biletlerin değeri ile sınırlıdır. Grevler, teknik arızalar, şiddetli hava koşulları veya üçüncü şahıs eylemleri gibi makul kontrolümüz dışındaki gecikme veya kayıplardan sorumlu değiliz."
      },
      {
        heading: "Müşteri Hizmetleri",
        content: "Rezervasyon, iade veya genel sorgularınız için lütfen web sitemizde verilen iletişim bilgilerini kullanarak müşteri hizmetleri ekibimizle iletişime geçin. Yanıt süreleri talep yoğunluğuna göre değişebilir."
      },
      {
        heading: "Uygulanabilir Hukuk",
        content: "Bu şartlar ve koşullar geçerli yasalara göre düzenlenmiş ve yorumlanmıştır. Her türlü ihtilaf ilgili mahkemelerin münhasır yetkisine tabidir."
      }
    ],
    trainRulesTitle: "Tren Bilet Kuralları",
    rulesButton: "Tren Kuralları",
    closeButton: "Kapat",
    trainRules: {
      sales: {
        title: "Satış Kuralları",
        content: `• Biletler en geç kalkıştan 30 dakika önce satın alınmalıdır. Satın alınan biletler devredilemez ve iptal/iptal politikalarına tabidir.

• Tüm yolcular bilet üzerindeki isimle eşleşen geçerli kimlik belgesi taşımak zorundadır.
  - 12 yaş altı çocuklar geçerli bileti olan bir yetişkin eşliğinde seyahat etmelidir.
  - Uluslararası yolcular pasaport veya eşdeğer kimlik belgesi göstermelidir.

• İndirim seçenekleri:
  - Erken satın alma: Kalkıştan en az 14 gün önce alınan biletlerde %10-25 indirim
  - Grup indirimi: Birlikte seyahat eden 10 veya daha fazla yolcuya uygulanır
  - Özel tarifeler: 65+ yaşlılar ve geçerli öğrenci kimliği olanlar %15 indirim hakkına sahiptir

• Bilet doğrulama:
  - E-biletler basılı veya mobil cihazda gösterilebilir olmalıdır
  - Şirket uygun bilet doğrulaması olmayan yolculara hizmet vermeme hakkını saklı tutar
  - Düzenli yolcular için sezonluk biletler mevcuttur ve önemli tasarruf sağlar`
      },
      transactions: {
        title: "Bilet İşlemleri",
        content: `• Bilet değişiklikleri ve iptalleri kalkıştan en az 2 saat önce istasyon gişelerinde veya online yapılmalıdır.

• İade politikası:
  - Kalkıştan 24 saatten fazla önce: %90 iade
  - 24 saat ile 2 saat arası: %50 iade
  - 2 saatten az kala: İade yok
  - Seyahat etmeyenler: İade yok

• Değişiklik ücretleri:
  - Güzergah değişikliği: Orijinal bilet fiyatının %10'u
  - Tarih değişikliği (aynı güzergah): 24 saatten önce yapılırsa %5 ücret
  - Sınıf yükseltme: Ücret farkı artı idari ücret

• Kayıp veya hasarlı biletler:
  - Kayıp biletler: Satın alma kanıtı ile ücret karşılığı yeniden düzenlenebilir
  - Hasarlı biletler: Orijinal bilet teslim edilirse ücretsiz değiştirilir
  - Dijital biletler: Resmi mobil uygulama ile yeni cihaza transfer edilebilir`
      },
      luggage: {
        title: "El Bagaj Kuralları",
        content: `• Her yolcu 55x40x20 cm boyutlarında en fazla 15 kg el bagajı taşıyabilir.

• Saklama koşulları:
  - Tüm bagajlar belirlenmiş alanlarda veya bagaj raflarında güvenli şekilde yerleştirilmeli
  - Büyük eşyalar kayıtlı bagaj olarak teslim edilmeli (ek ücret uygulanır)
  - Müzik aletleri gibi özel eşyalar önceden ayarlama gerektirir

• Yolcu sorumluluğu:
  - Yolcular bagaj ve kişisel eşyalarından kendileri sorumludur
  - Demiryolu şirketi personel hatası dışındaki kayıp/hasarlardan sorumlu değildir
  - Değerli eşyalar yolcunun yanında tutulmalıdır

• Yasaklı eşyalar:
  - Yanıcı maddeler ve sıkıştırılmış gazlar
  - Aşındırıcı malzemeler ve patlayıcılar
  - Ateşli silahlar ve mühimmat
  - Zehirli maddeler ve tehlikeli kimyasallar
  - Yolcu güvenliğini tehlikeye atabilecek eşyalar

• Elektronik cihazlar:
  - Dizüstü bilgisayar, tablet ve cep telefonlarına izin verilir
  - Trendeki düzenlemelere uygun şekilde kullanılmalıdır
  - Bazı trenlerde büyük elektronikler için özel depolama alanı bulunur`
      },
      pets: {
        title: "Evcil Hayvan Kuralları",
        content: `• Küçük evcil hayvanlar (8 kg altı) taşıma kabında olmalıdır.

• Küçük hayvan gereksinimleri:
  - 45x30x25 cm'yi aşmayan havalandırmalı taşıma kabı
  - Koltuk altında veya engel oluşturmayan alanda tutulmalı
  - Evcil hayvan bileti gerekli (standart yetişkin ücretinin %50'si)
  - Yolcu başına maksimum 2 küçük hayvan

• Orta boy köpekler (8-20 kg):
  - Tasmalı ve ağızlıklı olmalı
  - Tam ücretli evcil hayvan bileti gerekli
  - Sahibi sürekli kontrolü sağlamalı
  - Yolcu koltuklarında oturamaz

• Büyük hayvanlar (20 kg üstü):
  - Sadece belirli trenlerdeki özel vagonlarda taşınabilir
  - Önceden rezervasyon şart (en az 48 saat önce)
  - Özel taşıma belgeleri gerekli
  - Ek işlem ücreti uygulanır

• İstisnalar ve özel durumlar:
  - Rehber köpekler: Ücretsiz ve ağızlıksız seyahat edebilir
  - Hizmet hayvanları: Resmi sertifika ve kimlik gerekli
  - Egzotik, çiftlik ve vahşi hayvanlar: Boyut farketmeksizin yasaktır

• Sağlık gereksinimleri:
  - Güncel aşı belgeleri zorunludur
  - Tren personeli tarafından istenebilir
  - Rahatsızlık veren hayvanlar trenden çıkarılabilir`
      },
      bicycles: {
        title: "Bisiklet Kuralları",
        content: `• Katlanır bisikletler el bagajı sayılır ve ek bilet gerektirmez.

• Katlanır bisiklet gereksinimleri:
  - Koruyucu kılıfta düzgün katlanmış olmalı
  - Maksimum boyut: 80x60x40 cm
  - Normal bagaj alanlarında saklanmalı
  - Ek ücret veya rezervasyon gerekmez

• Standart bisikletler:
  - Özel bisiklet bileti gerektirir
  - Belirlenmiş bisiklet kompartımanlarında taşınmalı
  - Hızlı trenlerde sınırlı kapasite
  - Önceden rezervasyon önerilir

• Rezervasyon süreci:
  - En fazla 2 ay önceden rezerve edilebilir
  - İstasyon gişeleri, telefon veya web sitesi üzerinden
  - Yoğun sezonda (Nisan-Eylül) zorunludur
  - Belirli trenlerde kullanılabilirliğe tabidir

• Elektrikli bisikletler:
  - Çıkarılabilir pillerle taşınabilir
  - Pil el bagajı olarak ayrı taşınmalı
  - Güvenlik standartlarına uymalı
  - Pil kapasitesi 300Wh'ı geçmemeli

• Özel durumlar:
  - Tandem bisikletler: Sınırlı kabul, alana tabi
  - Yük bisikletleri: Genellikle kabul edilmez
  - Römorklu bisikletler: Sadece belirli trenlerde kabul edilir
  - Yarış bisikletleri: Standart kurallar geçerlidir`
      },
      strollers: {
        title: "Bebek Arabası Kuralları",
        content: `• Bebek arabaları ücretsiz taşınabilir ancak katlanabilir olmalıdır.

• Biniş ve hareket:
  - Biniş ve iniş sırasında katlanmalı
  - Tren koridorlarında katlı tutulmalı
  - Alan uygunsa ve engel oluşturmuyorsa açılabilir
  - Talep üzerine öncelikli biniş imkanı

• Saklama seçenekleri:
  - Kalabalık trenler: Bagaj alanlarında veya koltuk altında saklanmalı
  - Sakin trenler: Tekerlekli sandalye alanları kullanılabilir (öncelik tekerlekli sandalye kullanıcılarındadır)
  - Acil çıkışları ve koridorları asla kapatmamalı

• Güvenlik önlemleri:
  - Mümkünse değerli aksesuarlar çıkarılmalı
  - Demiryolu şirketi hasar veya hırsızlıktan sorumlu değildir
  - Bagaj düzgün sabitlenmeli
  - Koltuk terk edilirken kişisel eşyalar alınmalı

• Özel bebek arabaları:
  - İkiz/çoklu arabalar: İzin verilir ancak yer bulmak zor olabilir
  - Yoğun olmayan saatlerde seyahat önerilir
  - Motorlu arabalar: Özel düzenleme gerekebilir
  - Katlandığında 100x70x40 cm'yi aşan arabalar: Kabul edilmeyebilir`
      }
    },
    passengerGuidelines: "Yolcu Kuralları",
    subtitle: "Tüm yolcular için güvenli ve konforlu bir yolculuk sağlamak",
    guidelines: {
      pggeneralInfo: {
        title: "Genel Bilgiler",
        items: [
          "Tüm yolcular binmeden önce geçerli bir bilete sahip olmalıdır.",
          "Aksi belirtilmedikçe biletler iade edilemez.",
          "Trende yiyecek ve içecek tüketilebilir, ancak lütfen çöpleri uygun şekilde atın.",
          "Yolcular kendilerine ayrılan vagonlarda oturmalıdır."
        ]
      },
      pgluggagePolicy: {
        title: "Bagaj Politikası",
        items: [
          "Her yolcu en fazla 2 parça bagaj getirebilir.",
          "Büyük bagajlar belirlenmiş bölmelerde saklanmalıdır.",
          "Kesici aletler ve tehlikeli maddeler yasaktır."
        ]
      },
      pgbehaviorSafety: {
        title: "Davranış ve Güvenlik",
        items: [
          "Yolcular seyahat boyunca yerlerinde oturmalıdır.",
          "Trende sigara içmek kesinlikle yasaktır.",
          "Alkol sadece ölçülü olarak ve belirlenmiş alanlarda tüketilebilir.",
          "Acil bir durumda tren personelinin talimatlarını izleyin."
        ]
      },
      pgarrivalDeparture: {
        title: "Varış & Kalkış",
        items: [
          "Kalkıştan en az 15 dakika önce istasyonda olun.",
          "Tren istasyona vardığında yolcular düzenli bir şekilde inmelidir.",
          "Treni kaçırırsanız, yeniden planlama seçenekleri için gişe ile iletişime geçin."
        ]
      }
    },
    stationCenterDetail: {
        title: "İstasyon Merkezi",
        subtitle: "İstasyon adına göre tren hatlarını ara",
        searchPlaceholder: "İstasyon adı girin",
        noResults: '"{query}" için tren hattı bulunamadı',
        resultsTitle: "{station} üzerinden tren hatları",
        resultsCount: "{count} hat bulundu",
        durationLabel: "Süre",
        departureLabel: "Kalkış",
        arrivalLabel: "Varış",
        routeLabel: "Güzergah"
      },
      helpCenterD: {
        title: "Başvuru Merkezi",
        subtitle: "Başvurunuzu gönderin",
        appealType: "Başvuru Türü",
        selectType: "Başvuru Türü Seçin",
        appealTypes: {
          Refund: "İade",
          Complaint: "Şikayet",
          Suggestion: "Öneri",
          Appreciation: "Takdir"
        },
        contactInfo: {
          title: "İletişim Bilgileri",
          fields: {
            name: "Ad",
            surname: "Soyad",
            phoneNumber: "Telefon Numarası",
            email: "E-posta Adresi"
          }
        },
        travelInfo: {
          title: "Seyahat Bilgileri",
          fields: {
            ticketId: "Bilet Numarası",
            departureStation: "Kalkış İstasyonu",
            arrivalStation: "Varış İstasyonu"
          }
        },
        appealContent: "Başvuru İçeriği",
        appealContentPlaceholder: "Başvurunuzu detaylı şekilde açıklayın",
        submitButton: "Başvuruyu Gönder",
        success: {
          title: "Başvuru Başarıyla Gönderildi!",
          numberLabel: "Başvuru Numaranız",
          note: "Lütfen bu numarayı gelecekte referans için saklayın."
        }
      },
    }
}

export default translations;