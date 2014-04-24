Settings = Backbone.Model.extend({
	defaults: {
		loggedIn: false,
		language: "nl",
		copy: {
			nl: {
				general: {
					title: "DEVINE STAGE EVALUATIE"
				},
				home: {
					companyBtn: "STAGEBEDRIJF OF ORGANISATIE"
				},
				registration: {
					registerTitle: "Registratie",
					registerBtn: "REGISTREER",
					nameField: "NAAM",
					emailField: "EMAIL",
					companyField: "BEDRIJF"
				},
				login: {
					loginBtn: "LOGIN",
					emailField: "EMAIL",
					passwordField: "PASSWORD",
					loginError: "Je paswoord is niet correct of je hebt geen toegang tot het stageplatform."
				},
				internships:{
					studentLabel: "Student",
					organisationLabel: "Organisatie",
					mentorLabel: "Begeleider",
					interimLabel: "Tussentijdse evaluatie",
					finalLabel: "Eindevaluatie",
					evaluateBtn: "Vul aan..."
				},
				evaluation: {
					questionLabel: "Vraag",
					ratingLabel: "Beoordeling",
					scoreLabel: "Punt",
					remarkLabel: "Opmerking",
					selectionLabel: "Maak een keuze",
					requiredField: "Dit veld moet worden ingevuld",
					finalScoreLabel: "Eindscore"
				},
				error: {
					notFound: "<b>404:</b> Deze pagina werd niet gevonden"
				}
			},

			en: {
				general: {
					title: "DEVINE INTERNSHIP EVALUATION"
				},
				home: {
					companyBtn: "COMPANY OR ORGANISATION"
				},
				registration: {
					registerTitle: "Registration",
					registerBtn: "REGISTER",
					nameField: "NAME",
					emailField: "EMAIL",
					companyField: "COMPANY"
				},
				login: {
					loginBtn: "LOGIN",
					emailField: "EMAIL",
					passwordField: "PASSWORD",
					loginError: "Je paswoord is niet correct of je hebt geen toegang tot het stageplatform."
				},
				internships:{
					studentLabel: "Student",
					organisationLabel: "Organisatin",
					mentorLabel: "Mentor",
					interimLabel: "Interim evaluation",
					finalLabel: "Final evaluation",
					evaluateBtn: "Evaluate...",
				},
				evaluation: {
					questionLabel: "Question",
					ratingLabel: "Rating",
					scoreLabel: "Score",
					remarkLabel: "Remark",
					selectionLabel: "Select a score",
					requiredField: "This field is required",
					finalScoreLabel: "Final score"
				},
				error: {
				  notFound: "<b>404:</b> The page could not be found"
				}
			}
		}
	},
	initialize: function(){
    	this.bind("change:language", this.languageChangeHandler)
	},

	// update the language
    languageChangeHandler: function(event){
    	Backbone.trigger('languageChangeHandler');
    }
});

