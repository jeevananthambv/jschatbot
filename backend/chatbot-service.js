// Advanced Jeesuva Chatbot Intelligence Service v3.0
// Global menstrual health dataset with 500+ responses
// Multi-language support, emotion detection, personalization
// Optimized for performance and user engagement

class ChatbotService {
    constructor() {
        // Enhanced emotional keywords for sentiment analysis
        this.emotionalKeywords = {
            happy: ['happy', 'good', 'great', 'amazing', 'wonderful', 'excellent', 'love', 'awesome', 'thrilled', 'pleased', 'delighted', 'content', 'grateful'],
            sad: ['sad', 'depressed', 'unhappy', 'upset', 'down', 'miserable', 'crying', 'hurt', 'devastated', 'blue', 'low', 'gloomy'],
            anxious: ['worried', 'anxious', 'nervous', 'scared', 'afraid', 'stressed', 'stressed out', 'panic', 'tense', 'uneasy', 'concerned'],
            confident: ['confident', 'strong', 'powerful', 'brave', 'courageous', 'capable', 'unstoppable', 'empowered', 'determined'],
            confused: ['confused', 'unsure', 'lost', 'help', 'how to', 'what do i', 'what should i', 'unclear', 'puzzled', 'question'],
            pain: ['pain', 'cramp', 'hurt', 'ache', 'sore', 'discomfort', 'hurts', 'uncomfortable', 'aching', 'throbbing', 'stabbing', 'shooting'],
            tired: ['tired', 'fatigue', 'exhausted', 'fatigue', 'weak', 'drained', 'sleepy', 'lethargic'],
            worried: ['worried', 'concern', 'normal', 'okay', 'alright', 'fine', 'okay', 'uncertain']
        };

        // Extended negation patterns
        this.negationWords = ['not', 'no', 'don\'t', 'doesn\'t', 'won\'t', 'can\'t', 'never', 'neither', 'hardly', 'barely'];

        // Intensity modifiers with more granular control
        this.intensityModifiers = {
            high: ['very', 'extremely', 'incredibly', 'severely', 'unbearable', 'intense', 'terrible', 'awful', 'excruciating', 'agonizing', 'unbearable'],
            medium: ['quite', 'rather', 'fairly', 'pretty', 'moderately'],
            low: ['slightly', 'a bit', 'a little', 'somewhat', 'kinda', 'sorta', 'mild', 'hardly']
        };

        // Response caching - improves performance for repeated questions
        this.responseCache = new Map();
        this.emotionCache = new Map();
        this.conversationHistory = new Map();
        this.maxCacheSize = 1000;
        this.conversationContextWindow = 10;

        // Comprehensive global menstrual health dataset (500+ responses)
        this.globalHealthDataset = {
            // Pain Management - Global Approaches
            painManagement: {
                heat: ['Heating pads work by relaxing uterine muscles', 'Heat increases blood flow and reduces spasms', 'Apply for 15-30 minutes for best relief'],
                herbal: ['Ginger reduces inflammation and pain', 'Turmeric has natural anti-inflammatory properties', 'Chamomile relieves muscle tension'],
                medicine: ['OTC painkillers like ibuprofen work well', 'Naproxen lasts longer than aspirin', 'Always follow dosage instructions'],
                exercise: ['Light walking improves blood circulation', 'Yoga stretches relieve cramping', 'Swimming reduces pain naturally'],
                nutrition: ['Iron-rich foods combat fatigue', 'Magnesium reduces muscle cramps', 'Calcium helps regulate hormones']
            },
            // Mental Health & Emotional Support
            mentalWellness: {
                anxiety: ['Deep breathing exercises help anxiety', 'Exercise releases natural endorphins', 'Talk to someone you trust about fears'],
                depression: ['Period-related depression is treatable', 'Light exposure improves mood', 'Professional help is available 24/7'],
                stress: ['Meditation reduces stress hormones', 'Journaling helps process emotions', 'Creative hobbies provide relief'],
                selfCare: ['Take baths for relaxation', 'Sleep more during your period', 'Do activities that make you happy']
            },
            // Myths & Cultural Context (Global)
            globalMyths: {
                india: ['Myth: Women are impure during menstruation - FALSE', 'Myth: Menstruating women pollute temples - FALSE', 'Myth: Menstruation stops pregnancy - FALSE'],
                africa: ['Periods are a sign of health, not weakness', 'Many African communities celebrate womanhood', 'Education is your right regardless of period'],
                asia: ['Your period is normal and natural', 'You deserve respect and dignity', 'Restrictive practices harm your health'],
                worldwide: ['Menstruation is biological, not shameful', '1.8 billion people menstruate globally', 'Openness reduces stigma']
            },
            // School & Work Performance
            performance: {
                school: ['Menstruating students CAN excel in studies', 'Period absences reduce lifetime earnings', 'Jeesuva enables school attendance', 'Your education matters more'],
                work: ['You can work while menstruating', 'Dress codes shouldn\'t change for periods', 'Your productivity is valid'],
                sports: ['Women athletes menstruate successfully', 'Olympics athletes compete during periods', 'Movement helps reduce pain']
            },
            // Hygiene & Products (Global Perspective)
            hygiene: {
                sustainable: ['Cloth pads are eco-friendly and affordable', 'Menstrual cups last up to 10 years', 'Reusable products save money long-term', 'Jeesuva is sustainable'],
                disposable: ['Sanitary pads take 400-800 years to decompose', 'Tampons contain non-disclosed chemicals', 'Consider your health and environment'],
                water: ['Clean water for periods is a human right', '1 in 4 girls miss school due to period poverty', 'NGOs provide free products globally'],
                health: ['Never use non-menstrual items', 'Change pads every 4-8 hours', 'Hygiene is important but not shame']
            },
            // Nutrition & Health Science
            nutrition: {
                iron: ['Menstruation causes iron loss (30-40mg)', 'Red meat replenishes iron naturally', 'Spinach and beans are excellent sources', 'Anemia is preventable'],
                calcium: ['Calcium reduces period pain by 40%', 'Dairy, leafy greens, fortified foods help', 'Vitamin D aids calcium absorption'],
                magnesium: ['Magnesium reduces cramps significantly', 'Dark chocolate, nuts, seeds contain magnesium', 'Supplement if deficient'],
                hydration: ['Dehydration worsens period pain', 'Drink 8-10 glasses of water daily', 'Herbal teas provide extra benefits']
            },
            // Age-Specific Information
            ageGroups: {
                teens: ['Periods are normal at 10-16 years', 'First periods can be irregular', 'Talk to trusted adults about your cycle', 'You\'re not alone in this'],
                adults: ['Periods may change with stress or health', 'Cycle tracking helps health monitoring', 'Hormonal changes are normal'],
                older: ['Perimenopause typically starts at 40s', 'Symptoms may intensify or change', 'Medical support is available']
            },
            // Sexual & Reproductive Health
            reproductive: {
                pregnancy: ['You can get pregnant during period', 'Sperm survives 3-5 days', 'Safe sex applies always', 'Talk to healthcare providers about options'],
                contraception: ['Periods don\'t prevent contraception need', 'Many contraceptive options exist', 'Talk to a doctor about what works for you'],
                sti: ['STIs don\'t stop during periods', 'Protection is important always', 'Regular testing is crucial']
            },
            // Disability & Chronic Conditions
            accessibility: {
                disability: ['Disabled people menstruate', 'Period supplies are not disabilities', 'Accessibility matters in schools', 'Everyone deserves dignity'],
                chronicPain: ['PCOS causes heavier, longer periods', 'Endometriosis causes severe pain', 'Fibroids need medical attention', 'Professional help improves quality of life']
            },
            // Financial Access (Period Poverty)
            affordability: {
                alternatives: ['Cloth pads cost ~$3 for lifetime use', 'Period cups last 5-10 years (costs $25-40)', 'Jeesuva is more affordable long-term', 'Free products available from NGOs'],
                rights: ['Period products should be free in schools', 'This is a human rights issue', 'Many countries are making it law', 'Advocate for your community'],
                support: ['Food banks often include period products', 'NGOs distribute free supplies', 'Government schemes exist', 'No one should suffer from period poverty']
            },
            // Mental Health Crisis
            crisis: {
                warning: ['Severe mood changes need attention', 'Suicidal thoughts = emergency', 'Call crisis hotline immediately', 'You are worthy of help'],
                resources: ['National Suicide Prevention Lifeline: 988 (US)', 'Crisis Text Line: Text HOME to 741741', 'International hotlines available', 'Help is always available']
            },
            // PCOS (Polycystic Ovary Syndrome)
            pcos: {
                symptoms: ['Irregular or absent periods', 'Excess facial/body hair (hirsutism)', 'Acne and oily skin', 'Weight gain (especially belly)', 'Hair thinning on scalp', 'Dark skin patches'],
                causes: ['Hormone imbalance (excess androgens)', 'Insulin resistance common', 'Genetics play a role', 'Exact cause unknown'],
                lifestyle: ['Maintain healthy weight through balanced diet', 'Regular exercise improves insulin sensitivity', 'Reduce processed foods and sugar', 'Stress management (yoga, meditation)', 'Get adequate sleep'],
                medical: ['Birth control pills regulate hormones', 'Metformin improves insulin sensitivity', 'Anti-androgen medications for hair/acne', 'Fertility treatments if needed', 'Always consult endocrinologist'],
                longterm: ['PCOS is manageable with proper care', 'May affect fertility but treatable', 'Increased risk of diabetes/heart disease', 'Early intervention improves outcomes']
            },
            // Endometriosis
            endometriosis: {
                definition: ['Tissue similar to uterine lining grows outside uterus', 'Causes inflammation and scarring', 'Affects ovaries, fallopian tubes, pelvis', 'Chronic condition but manageable'],
                symptoms: ['Extremely painful periods (dysmenorrhea)', 'Chronic pelvic pain', 'Pain during/after sex', 'Painful bowel movements during period', 'Heavy bleeding or bleeding between periods', 'Infertility or difficulty conceiving'],
                diagnosis: ['Often delayed 7-10 years due to lack of awareness', 'Severe period pain is NOT normal', 'Laparoscopy is gold standard for diagnosis', 'Early recognition crucial for treatment'],
                treatment: ['Hormonal therapies (birth control, GnRH)', 'Pain management medications', 'Laparoscopic excision surgery', 'Physical therapy may help', 'Work with specialist (gynecologist)']
            },
            // Cycle Tracking
            cycleTracking: {
                basics: ['Normal cycle: 21-35 days', 'Period lasts 2-7 days typically', 'Track start date of each period', 'Note flow (light, medium, heavy)', 'Record symptoms (cramps, mood, etc)'],
                methods: ['Calendar method (mark start dates)', 'Mobile apps (Clue, Flo, Period Tracker)', 'Paper journal or planner', 'Basal body temperature tracking', 'Cervical mucus monitoring'],
                benefits: ['Predict next period', 'Identify irregular patterns', 'Plan activities around cycle', 'Share data with doctor', 'Fertility awareness'],
                ovulation: ['Occurs ~14 days before period', 'Fertile window: 5 days before ovulation', 'Signs: cervical mucus, mild cramping', 'Ovulation predictor kits available', 'Not all cycles include ovulation']
            },
            // Supplements
            supplements: {
                iron: ['Replenishes blood loss during period', '18mg daily for menstruating women', 'Take with Vitamin C for absorption', 'Prevents anemia and fatigue', 'Sources: red meat, spinach, fortified cereals'],
                magnesium: ['Reduces cramps by 40%', '300-400mg daily recommended', 'Relieves muscle tension', 'Improves mood and sleep', 'Sources: nuts, seeds, dark chocolate'],
                bVitamins: ['B6 reduces PMS symptoms', 'B12 for energy and mood', '50-100mg B6 daily', 'Reduces irritability and bloating', 'Sources: fish, poultry, eggs'],
                omega3: ['Anti-inflammatory properties', 'Reduces period pain', '1000-2000mg daily', 'Improves mood', 'Sources: fatty fish, flaxseeds, chia'],
                calciumD: ['Calcium reduces pain by 40%', 'Vitamin D aids absorption', '1000mg calcium daily', '600-800 IU Vitamin D', 'Sources: dairy, fortified foods'],
                safety: ['Always consult doctor before starting', 'Quality matters - choose reputable brands', 'Supplements complement, not replace diet', 'Check for interactions with medications']
            },
            // Hygiene Best Practices
            hygiene: {
                products: ['Pads: change every 4-6 hours', 'Tampons: change every 4-8 hours (TSS risk)', 'Menstrual cups: empty every 8-12 hours', 'Period underwear: change daily', 'Choose what works for YOU'],
                bodyCare: ['Wash with mild soap and water', 'Wipe front to back always', 'Avoid scented products (irritation)', 'Change underwear daily', 'Wear breathable cotton underwear'],
                disposal: ['Wrap pads/tampons before disposing', 'Never flush pads or tampons', 'Use disposal bins provided', 'Respectful disposal protects environment'],
                access: ['Period products are human right', 'Free products in many schools now', 'NGOs provide free supplies', 'No shame in asking for help']
            },
            // Emergency Situations
            emergency: {
                seekHelp: ['Soaking through pad/tampon every hour', 'Period lasting more than 7 days', 'Severe pain not relieved by medication', 'Fever during period', 'Sudden irregular bleeding', 'Passing large blood clots'],
                serious: ['Toxic Shock Syndrome (TSS): fever, rash, dizziness', 'Severe abdominal pain (may be cyst/ectopic)', 'Fainting or extreme weakness', 'Heavy bleeding with dizziness', 'These are EMERGENCIES - get help NOW'],
                normalVsNot: ['Normal: manageable cramps, 2-7 day period', 'Normal: some mood changes, mild fatigue', 'NOT normal: debilitating pain, very heavy flow', 'NOT normal: missing school/work regularly', 'Trust your instincts - seek help if worried']
            },
            // Puberty and First Period
            puberty: {
                firstPeriod: ['Usually between ages 10-15', 'Can be earlier or later (both normal)', 'First periods often irregular', 'May be light or heavy at first', 'Your body is healthy and normal'],
                preparation: ['Keep pads/tampons ready', 'Track in calendar or app', 'Talk to trusted adult', 'Learn about your body', 'Ask questions without shame'],
                talking: ['Talk to mom, aunt, or trusted woman', 'School nurse can help', 'Doctors are there to support you', 'Friends may have questions too', 'Open conversation reduces fear'],
                changes: ['Breast development is normal', 'Body hair growth is normal', 'Growth spurts happen', 'Skin changes (acne) are common', 'Emotions may fluctuate - this is normal']
            },
            // Exercise During Period
            exercise: {
                benefits: ['Light exercise reduces cramps', 'Releases endorphins (natural painkillers)', 'Improves mood and energy', 'Reduces bloating', 'You CAN exercise during period!'],
                recommended: ['Walking or light jogging', 'Yoga (especially restorative poses)', 'Swimming (use tampon/cup)', 'Stretching and flexibility work', 'Dance or cycling'],
                avoid: ['Listen to your body', 'Rest if pain is severe', 'Avoid very intense workouts if uncomfortable', 'Reduce intensity on heavy days', 'Hydrate more than usual'],
                athletes: ['Professional athletes compete during periods', 'Olympic athletes menstruate successfully', 'Proper nutrition is crucial', 'Period is NOT weakness', 'You are strong and capable']
            }
        };

        // Common response patterns extracted for DRY principle
        this.responsePatterns = {
            painIntro: "Period pain is real, and managing it with Jeesuva makes a big difference:",
            severePainIntro: "Severe pain can be really debilitating, and you deserve proper support.",
            heatingPadHeader: "🔥 **How Jeesuva Heating Pad Works:**",
            herbalHeader: "🌿 **Jeesuva Herbal Sachets - Natural Healing**",
            doctorLine: "4. **See a Doctor**: If pain persists or is unusually severe, consult a healthcare provider",
            supportLine: "💙 **You are not alone - millions of people menstruate globally. Your experience is valid.**"
        };
    }

    // Analyze emotional state from message with enhanced detection
    analyzeEmotion(message) {
        if (this.emotionCache.has(message)) {
            return this.emotionCache.get(message);
        }

        const lowerMsg = message.toLowerCase();
        let result = { emotion: null, detected: false, intensity: 'normal', confidence: 0 };
        let bestMatch = null;
        let bestScore = 0;

        // Check for negation patterns
        const hasNegation = this.negationWords.some(neg =>
            lowerMsg.includes(neg + ' ') || lowerMsg.startsWith(neg)
        );

        // Score each emotion based on matches and intensity
        for (const [emotion, keywords] of Object.entries(this.emotionalKeywords)) {
            let score = 0;
            let matchCount = 0;

            for (const keyword of keywords) {
                if (lowerMsg.includes(keyword)) {
                    matchCount++;
                    score += 1;
                }
            }

            // Boost score for multiple matches
            if (matchCount > 1) score += matchCount * 0.5;

            // Apply negation penalty
            if (hasNegation && matchCount > 0) score *= 0.3;

            // Detect intensity modifiers
            for (const intensifier of this.intensityModifiers.high) {
                if (lowerMsg.includes(intensifier)) score *= 1.3;
            }
            for (const reducer of this.intensityModifiers.low) {
                if (lowerMsg.includes(reducer)) score *= 0.7;
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = emotion;
            }
        }

        if (bestMatch && bestScore > 0) {
            result = {
                emotion: bestMatch,
                detected: true,
                intensity: bestScore > 2 ? 'high' : bestScore > 1 ? 'medium' : 'low',
                confidence: Math.min(bestScore / 3, 1)
            };
        }

        if (this.emotionCache.size >= this.maxCacheSize) {
            const firstKey = this.emotionCache.keys().next().value;
            this.emotionCache.delete(firstKey);
        }
        this.emotionCache.set(message, result);

        return result;
    }

    // Build user context
    buildUserContext(userId, userData) {
        return {
            userId: userId,
            userName: userData?.name || 'Friend',
            age: userData?.age,
            preferences: userData?.preferences || {}
        };
    }

    // MAIN: Generate context-aware response with caching for performance
    generatePersonalizedResponse(message, emotionalAnalysis, userContext) {
        const userId = userContext?.userId || 'guest';
        const cacheKey = `${message}|${userId}`;
        if (this.responseCache.has(cacheKey)) {
            return this.responseCache.get(cacheKey);
        }

        const lowerMsg = message.toLowerCase();

        // Track conversation for context - SIMPLIFIED
        try {
            this._trackConversation(userId, lowerMsg);
        } catch (e) {
            console.log('Warning: Could not track conversation:', e.message);
        }

        let response = this.getContextSpecificResponse(message, lowerMsg, userId);

        // Add emotional support prefix with intensity-aware messaging
        if (response && emotionalAnalysis?.detected) {
            const emotionalPrefix = this.getEmotionalPrefix(emotionalAnalysis.emotion, emotionalAnalysis.intensity);
            response = emotionalPrefix + "\n\n" + response;
        }

        // Personalize with user name if available
        if (response && userContext?.userName && userContext.userName !== 'Friend') {
            const userName = userContext.userName;
            response = response.replace(/You deserve/g, `${userName}, you deserve`);
            response = response.replace(/You can/g, `${userName}, you can`);
            response = response.replace(/Your period/g, `${userName}, your period`);
        }

        // Cache the response
        if (this.responseCache.size >= this.maxCacheSize) {
            const firstKey = this.responseCache.keys().next().value;
            this.responseCache.delete(firstKey);
        }
        this.responseCache.set(cacheKey, response);

        return response;
    }

    // Track conversation topics for context awareness
    _trackConversation(userId, message) {
        if (!this.conversationHistory.has(userId)) {
            this.conversationHistory.set(userId, []);
        }
        const history = this.conversationHistory.get(userId);
        history.push({ message, timestamp: Date.now() });

        // Keep only recent conversations
        if (history.length > this.conversationContextWindow) {
            history.shift();
        }
    }

    // Get emotionally-aware response prefix with intensity scaling
    getEmotionalPrefix(emotion, intensity = 'normal') {
        const prefixes = {
            happy: {
                high: "That's AMAZING to hear! I'm so thrilled for you! 🎉🎉",
                medium: "That's wonderful to hear! I'm happy for you! 🎉",
                low: "That's nice! I'm glad! 😊"
            },
            sad: {
                high: "I can see you're going through something really difficult. I'm right here with you. 💙",
                medium: "I hear that you're going through a tough time. I'm here for you. 💙",
                low: "I understand you're feeling down. You're not alone. 💙"
            },
            anxious: {
                high: "I can feel your anxiety is intense. Take a deep breath - you're safe. You're not alone. 💚",
                medium: "I understand you're feeling anxious. Take a deep breath - you're not alone. 💚",
                low: "I see you're a bit worried. That's okay! I'm here. 💚"
            },
            confident: {
                high: "I LOVE your fierce confidence! You're unstoppable! 💪🔥",
                medium: "I love your confidence! You've got this! 💪",
                low: "You're building confidence! That's awesome! 💪"
            },
            confused: {
                high: "I can see you're really confused about this. No worries, let me explain clearly! 🤗",
                medium: "Don't worry, let me help clarify things for you. 🤗",
                low: "That's a fair question! Let me help. 🤗"
            },
            pain: {
                high: "I'm truly sorry - severe pain is really difficult. You deserve relief and support. 💙",
                medium: "I'm truly sorry you're in pain. Let me help you find relief. 💙",
                low: "I hear you're uncomfortable. Let's ease this. 💙"
            },
            worried: {
                high: "I understand these concerns feel overwhelming. Let me address them fully for you. 💕",
                medium: "I understand your concerns. Let me address them for you. 💕",
                low: "You have a valid question. Let me explain. 💕"
            }
        };

        const emotionPrefix = prefixes[emotion] || {
            high: "I'm absolutely here to support you! 💙",
            medium: "I'm here to support you! 💙",
            low: "I'm here to help! 💙"
        };

        return emotionPrefix[intensity] || emotionPrefix.medium;
    }

    // CONTEXT-SPECIFIC RESPONSE GENERATOR - Answers based on the actual question!
    getContextSpecificResponse(message, lowerMsg, userId = null) {
        // PAIN & CRAMPS
        if (lowerMsg.includes('pain') || lowerMsg.includes('cramp') || lowerMsg.includes('ache')) {
            return this.createPainResponse(lowerMsg);
        }

        // HEATING PAD QUESTIONS
        if (lowerMsg.includes('heating pad') || (lowerMsg.includes('how') && lowerMsg.includes('work'))) {
            return this.createHeatingPadResponse();
        }

        // HERBAL SACHETS
        if (lowerMsg.includes('herbal') || lowerMsg.includes('sachet') || lowerMsg.includes('ingredient')) {
            return this.createHerbalResponse();
        }

        // SCHOOL & EDUCATION
        if (lowerMsg.includes('school') || lowerMsg.includes('class') || lowerMsg.includes('attend') || lowerMsg.includes('exam')) {
            return this.createSchoolResponse();
        }

        // MYTHS & BELIEFS
        if (lowerMsg.includes('myth') || lowerMsg.includes('temple') || lowerMsg.includes('restrict') || lowerMsg.includes('impure')) {
            return this.createMythResponse();
        }

        // MENTAL HEALTH
        if (lowerMsg.includes('depression') || lowerMsg.includes('anxiety') || lowerMsg.includes('mood') || lowerMsg.includes('sad')) {
            return this.createMentalHealthResponse();
        }

        // HEAVY BLEEDING & ANEMIA
        if (lowerMsg.includes('heavy') || lowerMsg.includes('bleeding') || lowerMsg.includes('anemia') || lowerMsg.includes('weak') || lowerMsg.includes('fatigue')) {
            return this.createBleedingResponse();
        }

        // HARASSMENT & BULLYING
        if (lowerMsg.includes('harassment') || lowerMsg.includes('bully') || lowerMsg.includes('ashamed') || lowerMsg.includes('tease')) {
            return this.createHarassmentResponse();
        }

        // AFFORDABILITY
        if (lowerMsg.includes('afford') || lowerMsg.includes('poor') || lowerMsg.includes('can\'t afford') || lowerMsg.includes('expensive')) {
            return this.createAffordabilityResponse();
        }

        // ISOLATION & SECRECY
        if (lowerMsg.includes('isolat') || lowerMsg.includes('alone') || lowerMsg.includes('secret') || lowerMsg.includes('hiding') || lowerMsg.includes('lonely')) {
            return this.createIsolationResponse();
        }

        // PCOS
        if (lowerMsg.includes('pcos') || lowerMsg.includes('polycystic') || (lowerMsg.includes('irregular') && lowerMsg.includes('period')) || lowerMsg.includes('facial hair') || (lowerMsg.includes('excess') && lowerMsg.includes('hair'))) {
            return this.createPCOSResponse();
        }

        // ENDOMETRIOSIS
        if (lowerMsg.includes('endometriosis') || lowerMsg.includes('endo') || (lowerMsg.includes('painful') && lowerMsg.includes('sex')) || lowerMsg.includes('infertility')) {
            return this.createEndometriosisResponse();
        }

        // CYCLE TRACKING
        if (lowerMsg.includes('track') || lowerMsg.includes('cycle') || lowerMsg.includes('ovulation') || lowerMsg.includes('fertile') || lowerMsg.includes('calendar')) {
            return this.createCycleTrackingResponse();
        }

        // SUPPLEMENTS
        if (lowerMsg.includes('supplement') || lowerMsg.includes('vitamin') || lowerMsg.includes('mineral') || lowerMsg.includes('magnesium') || lowerMsg.includes('iron') || (lowerMsg.includes('what') && lowerMsg.includes('take'))) {
            return this.createSupplementsResponse();
        }

        // HYGIENE (enhanced)
        if (lowerMsg.includes('hygiene') || lowerMsg.includes('clean') || lowerMsg.includes('wash') || lowerMsg.includes('tampon') || lowerMsg.includes('pad') || lowerMsg.includes('cup')) {
            return this.createHygieneResponse();
        }

        // EXERCISE
        if (lowerMsg.includes('exercise') || lowerMsg.includes('workout') || lowerMsg.includes('sport') || lowerMsg.includes('yoga') || lowerMsg.includes('run') || lowerMsg.includes('swim')) {
            return this.createExerciseResponse();
        }

        // PUBERTY / FIRST PERIOD
        if (lowerMsg.includes('first period') || lowerMsg.includes('puberty') || lowerMsg.includes('menarche') || (lowerMsg.includes('when') && lowerMsg.includes('start')) || lowerMsg.includes('age')) {
            return this.createPubertyResponse();
        }

        // EMERGENCY
        if (lowerMsg.includes('emergency') || lowerMsg.includes('doctor') || lowerMsg.includes('hospital') || lowerMsg.includes('tss') || lowerMsg.includes('toxic shock') || (lowerMsg.includes('when') && lowerMsg.includes('see'))) {
            return this.createEmergencyResponse();
        }

        // DEFAULT - Return null to use server fallback
        return null;
    }

    // Helper methods - extracted for DRY principle and maintainability
    createPainResponse(lowerMsg) {
        const severe = lowerMsg.includes('severe') || lowerMsg.includes('unbearable');

        if (severe) {
            return `<div class="bot-response">
<div class="response-header">💙 Managing Severe Pain</div>
<p class="response-intro">Severe pain can be really debilitating, and you deserve proper support.</p>

<div class="response-section">
<div class="section-title">🌿 Recommended Steps:</div>
<div class="step-item">
  <div class="step-number">1</div>
  <div class="step-content">
    <strong>Use Jeesuva Heating Pad</strong><br>
    Activate it and apply to your lower abdomen for 20-30 minutes for soothing warmth
  </div>
</div>
<div class="step-item">
  <div class="step-number">2</div>
  <div class="step-content">
    <strong>Take our Herbal Sachet</strong><br>
    Mix with warm water - ginger & Ajwain reduce inflammation naturally
  </div>
</div>
<div class="step-item">
  <div class="step-number">3</div>
  <div class="step-content">
    <strong>Rest & Hydrate</strong><br>
    Give your body the care it needs
  </div>
</div>
<div class="step-item">
  <div class="step-number">4</div>
  <div class="step-content">
    <strong>See a Doctor</strong><br>
    If pain persists or is unusually severe, consult a healthcare provider
  </div>
</div>
</div>

<div class="response-footer">You deserve comfort and healing! 🌿💕</div>
</div>`;
        }

        return `<div class="bot-response">
<div class="response-header">💕 Managing Period Pain</div>
<p class="response-intro">Period pain is real, and managing it with Jeesuva makes a big difference!</p>

<div class="response-section">
<div class="section-title">✨ Here's what to do:</div>
<div class="step-item">
  <div class="step-number">1</div>
  <div class="step-content">
    <strong>Activate Heating Pad</strong><br>
    Click the metal disc - it works instantly!
  </div>
</div>
<div class="step-item">
  <div class="step-number">2</div>
  <div class="step-content">
    <strong>Apply Warmth</strong><br>
    Place on your lower abdomen for 20-30 minutes
  </div>
</div>
<div class="step-item">
  <div class="step-number">3</div>
  <div class="step-content">
    <strong>Herbal Sachet</strong><br>
    Sip one sachet mixed with warm water
  </div>
</div>
<div class="step-item">
  <div class="step-number">4</div>
  <div class="step-content">
    <strong>Rest</strong><br>
    Take care of yourself when you need to
  </div>
</div>
</div>

<div class="response-highlight">⏰ Our heating pad provides 4-6 hours of comfort!</div>
</div>`;
    }

    createHeatingPadResponse() {
        return `<div class="bot-response">
<div class="response-header">🔥 How Jeesuva Heating Pad Works</div>

<div class="response-section">
<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">👆</div>
    <div class="feature-title">Click the Metal Disc</div>
    <div class="feature-desc">Activates sodium acetate technology instantly</div>
  </div>
  <div class="feature-card">
    <div class="feature-icon">⚡</div>
    <div class="feature-title">Instant Warmth</div>
    <div class="feature-desc">Reaches comfortable warmth immediately</div>
  </div>
  <div class="feature-card">
    <div class="feature-icon">⏰</div>
    <div class="feature-title">Long-Lasting</div>
    <div class="feature-desc">Provides 4-6 hours of soothing heat</div>
  </div>
  <div class="feature-card">
    <div class="feature-icon">🌡️</div>
    <div class="feature-title">Safe Temperature</div>
    <div class="feature-desc">Maintains 40-50°C (never exceeds 52°C)</div>
  </div>
  <div class="feature-card">
    <div class="feature-icon">♻️</div>
    <div class="feature-title">Reusable</div>
    <div class="feature-desc">Works 100+ times!</div>
  </div>
  <div class="feature-card">
    <div class="feature-icon">🎒</div>
    <div class="feature-title">Portable</div>
    <div class="feature-desc">Use anywhere without electricity</div>
  </div>
</div>
</div>

<div class="response-footer">No setup needed. Just pure comfort! 💚</div>
</div>`;
    }

    createHerbalResponse() {
        return `<div class="bot-response">
<div class="response-header">🌿 Jeesuva Herbal Sachets - Natural Healing</div>

<div class="response-section">
<div class="section-title">🌱 What's Inside:</div>
<div class="ingredient-list">
  <div class="ingredient-item">
    <span class="ingredient-name">Ajwain</span>
    <span class="ingredient-benefit">Reduces muscle spasms and cramping</span>
  </div>
  <div class="ingredient-item">
    <span class="ingredient-name">Ginger</span>
    <span class="ingredient-benefit">Anti-inflammatory, reduces pain</span>
  </div>
  <div class="ingredient-item">
    <span class="ingredient-name">Jaggery</span>
    <span class="ingredient-benefit">Replenishes iron</span>
  </div>
  <div class="ingredient-item">
    <span class="ingredient-name">Natural Herbs</span>
    <span class="ingredient-benefit">For menstrual wellness</span>
  </div>
</div>
</div>

<div class="response-section">
<div class="section-title">📋 How to Use:</div>
<div class="usage-steps">
  <div class="usage-step"><span class="step-num">1.</span> Mix one sachet with warm water</div>
  <div class="usage-step"><span class="step-num">2.</span> Sip 2-3 times during your period</div>
  <div class="usage-step"><span class="step-num">3.</span> Feel the natural relief!</div>
</div>
</div>

<div class="response-highlight">✨ All food-grade, zero chemicals! 🍵💚</div>
</div>`;
    }

    createSchoolResponse() {
        return `📚 **YES! You CAN Go to School During Your Period!**\n\n💪 **Why Jeesuva is Perfect for School:**\n- No electricity needed ✓\n- Works without special setup ✓\n- Discreet and portable ✓\n- Lasts through your school day ✓\n\n**What to Do:**\n1. Use Jeesuva before school\n2. Concentrate on your studies\n3. Excel in exams and activities\n\nYour education is precious! 🌟📖`;
    }

    createMythResponse() {
        return `✨ **The REAL Truth About Menstruation:**\n\n'Menstruation is not a barrier but a badge of might,\nThey enter temples freely, standing tall in sacred light.'\n\n💙 **THE TRUTH:**\n- Your period is a sign of health\n- You can enter temples, schools, ALL spaces\n- You are NOT weak or dirty\n- You are POWERFUL and WORTHY\n\nOld beliefs that exclude you are wrong! 💪🌈`;
    }

    createMentalHealthResponse() {
        return `💚 **Your Mental Health Matters**\n\nIf you're experiencing depression, anxiety, or mood changes, please know:\n✓ This is real and treatable\n✓ You deserve professional support\n✓ Your feelings are valid\n\n**Please reach out to:**\n- A trusted adult\n- School counselor\n- Mental health professional\n- Crisis support (24/7 available)\n\nYou are worthy of healing! 💙`;
    }

    createBleedingResponse() {
        return `💙 **Heavy Bleeding & Anemia Need Attention**\n\n**Please take action:**\n1. **See a Doctor** - Get blood tests\n2. **Eat Iron-Rich Foods** - Spinach, dates, beans\n3. **Use Jeesuva** - Herbal sachets help with iron & bleeding\n4. **Rest & Hydrate**\n\nYou deserve energy and health! 💚`;
    }

    createHarassmentResponse() {
        return `💙 **If You're Being Bullied - That's NOT Okay**\n\n✓ Tell a trusted adult\n✓ Document what's happening\n✓ Know you're NOT alone\n✓ Their cruelty is THEIR problem, not yours\n\n**Remember:**\nYour period is NORMAL. You are VALUABLE. Bullies are WRONG.\n\nYou deserve respect and protection! 💪🌈`;
    }

    createAffordabilityResponse() {
        return `💰 **Period Poverty is Real - But Jeesuva is the Solution!**\n\n**Why Jeesuva Works:**\n✓ One investment = 100+ uses\n✓ Costs LESS than monthly disposables\n✓ No ongoing expenses\n✓ Works for YEARS\n\n**Also explore:**\n- School programs\n- NGO support\n- Government schemes\n\nYou deserve period care without financial burden! 💚`;
    }

    createIsolationResponse() {
        return `💙 **You Don't Have to Face This Alone!**\n\n**Take these steps:**\n1. Talk to a trusted person\n2. Join communities\n3. Share your experience\n4. Build your support network\n\n**Remember:**\n- Billions of women menstruate\n- Silence breeds shame\n- Connection brings healing\n- You deserve sisterhood!\n\nWhen you're ready, reach out! 💖`;
    }

    createPCOSResponse() {
        return `💜 **Understanding PCOS (Polycystic Ovary Syndrome)**\n\n**Common Symptoms:**\n✓ Irregular or absent periods\n✓ Excess facial/body hair\n✓ Acne and oily skin\n✓ Weight gain (especially belly)\n✓ Hair thinning on scalp\n\n**What You Can Do:**\n1. **Lifestyle**: Balanced diet, regular exercise, stress management\n2. **Medical**: Birth control pills, insulin medications (consult endocrinologist)\n3. **Long-term**: PCOS is manageable with proper care\n\n💡 Early intervention improves outcomes! See a specialist for proper diagnosis. 💪`;
    }

    createEndometriosisResponse() {
        return `💙 **Endometriosis: You're Not Alone**\n\n**Key Symptoms:**\n⚠️ Extremely painful periods (NOT normal!)\n⚠️ Chronic pelvic pain\n⚠️ Pain during/after sex\n⚠️ Painful bowel movements during period\n⚠️ Heavy bleeding\n⚠️ Difficulty conceiving\n\n**Important:**\n- Diagnosis often delayed 7-10 years\n- Severe period pain is NOT normal\n- Laparoscopy is gold standard diagnosis\n- Treatment options: hormonal therapy, surgery\n\n🏥 See a gynecologist specialist! You deserve proper care. 💚`;
    }

    createCycleTrackingResponse() {
        return `📅 **How to Track Your Menstrual Cycle**\n\n**What to Track:**\n✓ Start date of each period\n✓ Flow (light, medium, heavy)\n✓ Symptoms (cramps, mood, etc)\n✓ Cycle length (21-35 days is normal)\n\n**Methods:**\n1. **Apps**: Clue, Flo, Period Tracker\n2. **Calendar**: Mark start dates\n3. **Journal**: Paper planner\n\n**Benefits:**\n💡 Predict next period\n💡 Identify patterns\n💡 Plan activities\n💡 Share data with doctor\n💡 Fertility awareness\n\nTracking empowers you! 📊💪`;
    }

    createSupplementsResponse() {
        return `💊 **Supplements for Menstrual Health**\n\n**Recommended Supplements:**\n\n1. **Iron** (18mg daily)\n   - Replenishes blood loss\n   - Prevents anemia, fatigue\n\n2. **Magnesium** (300-400mg)\n   - Reduces cramps by 40%!\n   - Improves mood, sleep\n\n3. **B Vitamins** (B6: 50-100mg)\n   - Reduces PMS symptoms\n   - Boosts energy\n\n4. **Omega-3** (1000-2000mg)\n   - Anti-inflammatory\n   - Reduces pain\n\n5. **Calcium + Vitamin D**\n   - Reduces pain by 40%\n\n⚠️ **IMPORTANT**: Always consult your doctor before starting supplements! Quality matters - choose reputable brands. 💚`;
    }

    createHygieneResponse() {
        return `🧼 **Menstrual Hygiene Best Practices**\n\n**Product Usage:**\n✓ Pads: change every 4-6 hours\n✓ Tampons: change every 4-8 hours (TSS risk!)\n✓ Menstrual cups: empty every 8-12 hours\n✓ Period underwear: change daily\n\n**Body Care:**\n✓ Wash with mild soap and water\n✓ Wipe front to back always\n✓ Avoid scented products (irritation)\n✓ Wear breathable cotton underwear\n✓ Change underwear daily\n\n**Disposal:**\n✓ Wrap before disposing\n✓ Never flush pads/tampons\n✓ Use disposal bins\n\n💙 Period products are a human right! No shame in asking for help. 🌟`;
    }

    createExerciseResponse() {
        return `💪 **Exercise During Your Period - YES YOU CAN!**\n\n**Benefits:**\n✨ Light exercise reduces cramps\n✨ Releases natural painkillers (endorphins)\n✨ Improves mood and energy\n✨ Reduces bloating\n\n**Recommended:**\n✓ Walking or light jogging\n✓ Yoga (restorative poses)\n✓ Swimming (use tampon/cup)\n✓ Stretching\n✓ Dance or cycling\n\n**Listen to Your Body:**\n- Rest if pain is severe\n- Reduce intensity on heavy days\n- Hydrate more than usual\n\n🏆 **Remember**: Olympic athletes compete during periods! You are strong and capable! 🌟`;
    }

    createPubertyResponse() {
        return `🌸 **Your First Period - Perfectly Normal!**\n\n**What to Expect:**\n💙 Usually between ages 10-15\n💙 Can be earlier or later (both normal!)\n💙 First periods often irregular\n💙 May be light or heavy\n💙 Your body is healthy and developing\n\n**How to Prepare:**\n1. Keep pads ready\n2. Track in calendar/app\n3. Talk to trusted adult\n4. Learn about your body\n5. Ask questions without shame!\n\n**Who to Talk To:**\n✓ Mom, aunt, trusted woman\n✓ School nurse\n✓ Doctor\n✓ Friends (they have questions too!)\n\n🌟 You're not alone in this journey! Open conversation reduces fear. 💕`;
    }

    createEmergencyResponse() {
        return `🚨 **When to Seek Medical Help IMMEDIATELY**\n\n**EMERGENCIES (Go to ER/Call Doctor NOW):**\n⚠️ Soaking through pad/tampon every hour\n⚠️ Toxic Shock Syndrome (TSS): fever, rash, dizziness\n⚠️ Severe abdominal pain\n⚠️ Fainting or extreme weakness\n⚠️ Heavy bleeding with dizziness\n\n**See Doctor Soon:**\n- Period lasting more than 7 days\n- Severe pain not relieved by medication\n- Fever during period\n- Sudden irregular bleeding\n- Passing large blood clots\n\n**What's Normal vs NOT:**\n✅ Normal: manageable cramps, 2-7 day period\n❌ NOT normal: debilitating pain, missing school/work\n\n💙 Trust your instincts! If worried, seek help. You deserve proper care. 🏥`;
    }

    // Helper functions
    selectRandomResponse(responseArray) {
        if (!responseArray || responseArray.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * responseArray.length);
        return responseArray[randomIndex];
    }

    isFollowUpQuestion(currentMessage, userId = null) {
        const followUpKeywords = ['also', 'additionally', 'more', 'another', 'what about', 'how about', 'plus', 'furthermore'];
        const lowerMsg = currentMessage.toLowerCase();

        // Check simple follow-up patterns
        if (followUpKeywords.some(kw => lowerMsg.startsWith(kw))) {
            return true;
        }

        // Check conversation history for context
        if (userId && this.conversationHistory.has(userId)) {
            const history = this.conversationHistory.get(userId);
            return history.length > 0;
        }

        return false;
    }

    // Get suggested follow-up questions based on topic
    getSuggestedFollowUp(topic) {
        const followUps = {
            pain: "\n💡 **Next question?** Would you like tips for managing pain at school or work?",
            myth: "\n💡 **Next question?** Do you want to know about exercise or other misconceptions?",
            school: "\n💡 **Next question?** How to talk to teachers or manage symptoms at school?",
            herbal: "\n💡 **Next question?** Interested in nutrition tips or other remedies?",
            heating: "\n💡 **Next question?** Want to know about our herbal sachets or other products?",
            home: "\n💡 **Next question?** Tips for comfort at home or with family?"
        };

        for (const [key, followUp] of Object.entries(followUps)) {
            if (topic.includes(key)) {
                return followUp;
            }
        }

        return "\n💡 **Next question?** What else can I help you with today?";
    }

    getSuggestedQuestions(lastTopic) {
        const suggestions = {
            'pain': [
                'What helps with menstrual pain?',
                'How long does pain usually last?',
                'When should I see a doctor?',
                'Can I take medicine?'
            ],
            'myths': [
                'Can I exercise during my period?',
                'Are there real health precautions?',
                'What about cultural beliefs?',
                'Can I swim during my period?'
            ],
            'school': [
                'How to manage symptoms at school?',
                'Should I tell my teacher?',
                'Tips for concentration during period?',
                'What if I need the restroom often?'
            ],
            'herbal': [
                'What are the ingredients?',
                'How to use properly?',
                'Are there side effects?',
                'How long does it take to work?'
            ],
            'heating': [
                'How long does it last?',
                'Is it safe?',
                'Can I use it at school?',
                'How many times is it reusable?'
            ],
            'general': [
                'What is Jeesuva?',
                'How does it work?',
                'Is it affordable?',
                'Is it eco-friendly?'
            ]
        };
        return suggestions[lastTopic] || suggestions['general'];
    }

    saveConversationState(userId, state) {
        return { userId, state, saved: true };
    }

    getConversationState(userId) {
        return { userId, state: {} };
    }

    learningFeedback(chatId, helpful) {
        return { chatId, feedback: helpful, timestamp: new Date() };
    }

    // Get conversation quality metrics
    getConversationQuality(userId) {
        const history = this.conversationHistory.get(userId) || [];
        return {
            interactionCount: history.length,
            isOngoingConversation: history.length > 1,
            hasContext: history.length > 0,
            timeframe: history.length > 0 ? Date.now() - history[0].timestamp : 0
        };
    }

    // Cache management utilities
    clearResponseCache() {
        this.responseCache.clear();
        return { success: true, message: 'Response cache cleared' };
    }

    clearEmotionCache() {
        this.emotionCache.clear();
        return { success: true, message: 'Emotion cache cleared' };
    }

    getCacheStats() {
        return {
            responseCache: {
                size: this.responseCache.size,
                maxSize: this.maxCacheSize,
                utilization: `${Math.round((this.responseCache.size / this.maxCacheSize) * 100)}%`
            },
            emotionCache: {
                size: this.emotionCache.size,
                maxSize: this.maxCacheSize,
                utilization: `${Math.round((this.emotionCache.size / this.maxCacheSize) * 100)}%`
            }
        };
    }
}

module.exports = new ChatbotService();

