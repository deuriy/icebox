$.validator.addMethod(
	"regex",
	function(value, element, regexp) {
		var re = new RegExp(regexp);
		return this.optional(element) || re.test(value);
	},
	"Поле заполнено не верно"
);

class InteractiveForm {
	constructor(el, opts = {}) {

		this.$form = $(el);

		let $form = this.$form;

		if ($form.data("action")) {
			$form.prop('action', $form.data("action"));
		}

		$form.find('[name="phone"]').inputmask({
			mask: "+7 999 999-99-99",
			showMaskOnHover: false,
		});

		$form.find('[name="captcha"]').inputmask({
			mask: "99999",
			showMaskOnHover: false
		});

		let validatorOpts = {
			rules: {
				phone: {
					required: true,
					regex: /\+7\s\d\d\d\s\d\d\d\-\d\d\-\d\d/
				},

				email: {
					email: true,
				},

				captcha: {
					required: true,
					regex: /\d\d\d\d\d/
				},

			},

			messages: {
				fio: {
					required: "Обязательное поле"
				},

				phone: {
					required: "Обязательное поле",
					regex: "Поле заполнено неверно"
				},

				email: {
					required: "Обязательное поле",
					email: "Поле заполнено неверно"
				},

				car_number: {
					required: "Обязательное поле"
				}
			},

			errorElement: "span",
			onfocusout: (el/*, event*/) => {
				$(el).valid();
			},

			focusCleanup: false,
			submitHandler: opts.submitHandler || this.standartFormHandler, //(form)=>{}
			errorPlacement: ($errorLabel, $el) => {
				if ($el.attr('name') === "agree") {
					return true;
				} else {
					$errorLabel.addClass('Form_hint Form_hint-error');
					$el.after($errorLabel);
					return true;
				}
			},
		};

		if (opts.validatorParams) {
			$.extend(true, validatorOpts, opts.validatorParams);
		}

		if (opts.successBlockMod) {
			$.extend(true, opts, { successBlockMod: "default" });
		}

		this.opts = opts;
		this.validator = $form.validate(validatorOpts);
	}

	standartFormHandler(form) {
		let $form = $(form);

		window.pagePreloader.show();

		let dataToSend = $.extend(true, $form.serializeObject(), {
			Submit: 1,
			url: window.location.href,
		});

		$.ajax({
			url: form.action,
			type: form.method,
			data: dataToSend,
		}).done((response) => {
			let errorCode = parseInt(response.code);
			if (errorCode === 0) {
				let successText =
					`<div class="FormSuccess">` +
					`<div class="FormSuccess_title Heading3">Заявка отправлена!</div>` +
					`<div class="FormSuccess_subtitle">Спасибо, ваша заявка отправлена!</div>` +
					`<div class="FormSuccess_text ">${response.success}</div>` +
					`</div>`;
				window.requestAnimationFrame(() => {
					$form.hide().after(successText);
				});

			} else {
				alert("Не удалось отправить форму! Попробуйте позже или обратитесь по телефону...");
			}
		}).always(( /*response*/ ) => {
			window.pagePreloader.hide();
		});
	}

	destroy() {
		this.validator.destroy();
		this.$form.find('input').inputmask('remove');
	}
}