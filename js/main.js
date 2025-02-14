'use strict'



let docWidth = document.body.clientWidth

// Функционал блокировки скрола при открытии модального окна
const BlockScroll = {
    open: function () {
        setTimeout(function () {

            if (!document.body.hasAttribute('data-body-scroll-fix')) {
                let scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Получаем позицию прокрутки

                document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = '-' + scrollPosition + 'px';
                document.body.style.left = '0';
                document.body.style.right = '0';
                if ($('body').height() < $(window).height()) {
                    document.body.style.bottom = '0';
                }

            }
        }, 10);
    },
    close: function () {
        setTimeout(function () {
            if (document.body.hasAttribute('data-body-scroll-fix')) {

                let scrollPosition = document.body.getAttribute('data-body-scroll-fix'); // Получаем позицию прокрутки из атрибута

                document.body.removeAttribute('data-body-scroll-fix'); // Удаляем атрибут
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                window.scroll(0, scrollPosition); // Прокручиваем на полученное из атрибута значение
            }
        }, 10)
    }
}
// ------------------------------------


jQuery(document).ready(function ($) {


    let tg = window.Telegram.WebApp;
    console.log(tg.initData);

    const tgObject = '<div class="tg-elem flex-block"></div>',
        tg_InitData = tg
    $(tgObject).insertBefore('h1')
    // console.log(tg_InitData)
    for (var key in tg_InitData) {
        if (tg_InitData.hasOwnProperty(key)) {
            const KeyValue = "<span>" + key + " -> " + tg_InitData[key] + "</span>"
            $(KeyValue).appendTo('.tg-elem')
            console.log(key + " -> " + tg_InitData[key]);
        }
    }

    const InitDefault = {
        defaultOptions: {
            cartWrapper: $('.header-nav_link.--cart')
        },
        init: function (options) {
            var options = $.extend(this.defaultOptions, options)
            options.cartWrapper[0].cardID = []
            console.log(options.cartWrapper)
        }
    }
    InitDefault.init()


    // Инициализация плагина анимации
    AOS.init({
        once: true,
    });
    // ------------------------------------

    // Инициализация плагина параллакс
    if ($('.rellax').length)
        var rellax = new Rellax('.rellax');



    // Инициализация бибилиотеки валидности номера телефона //
    function InitMaskPhone() {
        if ($(".input-phone").length > 0) {
            $(".input-phone").inputmask({
                mask: "+7 999 999 99 99",
            });
        }
    }
    //----------------------//
    InitMaskPhone();

    function InitMaskName() {
        if ($('.input-name').length > 0) {
            $(".input-name").inputmask({
                mask: "z{*} ",
                showMaskOnHover: false,
                // greedy: false,
                definitions: {
                    'z': {
                        validator: "[A-Za-zА-Яа-яЁё\u0020\-]",
                    }
                }
            });
        }
    }
    InitMaskName()

    let ValidateEmail = function (email) {
        // console.log(email.value)
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email.val()) == false) {
            return false
        }
        else return true
    }
    // Инициадизация отправки формы
    // const Forms = {
    //     defaultsOptions: {
    //         FormsElems: $('.form-default')
    //     },
    //     submit: function (options) {
    //         var options = $.extend(this.defaultsOptions, options)
    //         // console.log(options)
    //         options.FormsElems.on('submit', function (e) {
    //             e.preventDefault()
    //             let EditInputWrapper = function (input, invalidText) {
    //                 if (!input.closest('.default-input-wrapper.invalid').length) {
    //                     var ItemInputWrapper = input.closest('.default-input-wrapper')
    //                     ItemInputWrapper.addClass('invalid')
    //                     if (invalidText) {
    //                         var InvalidText = "<span class='invalid-text'>" + invalidText + "</span>"
    //                         $(InvalidText).appendTo(ItemInputWrapper)
    //                     }
    //                 }
    //             }

    //             // console.log('submit')
    //             let $this = $(this),
    //                 InvalidCount = 0,
    //                 AllRequiredInputs = $this.find('.required input')
    //             // console.log(AllRequiredInputs)

    //             $.each(AllRequiredInputs, function (i, input) {
    //                 // console.log(input)
    //                 if ($(input).val() == '') {
    //                     EditInputWrapper($(input), 'Заполните обязательное поле')
    //                     InvalidCount += 1
    //                 }
    //                 else {
    //                     if ($(input).hasClass('input-phone') && !$(input).inputmask("isComplete")) {
    //                         EditInputWrapper($(input), 'Введите корректный номер')
    //                         InvalidCount += 1
    //                     }
    //                     if ($(input).hasClass('input-mail') && !ValidateEmail($(input))) {
    //                         EditInputWrapper($(input), 'Введите корректный email')
    //                         InvalidCount += 1
    //                     }
    //                 }
    //             })

    //             const FormConfInput = $this.find('input[type="checkbox"]')
    //             if (FormConfInput.prop('checked') == false) {
    //                 const ItemInputWrapper = FormConfInput.closest('.default-input-wrapper')
    //                 ItemInputWrapper.addClass('invalid')
    //                 InvalidCount += 1
    //             }

    //             if (InvalidCount == 0) {
    //                 const formData = new FormData()
    //                 $.each(AllRequiredInputs, function () {
    //                     let $thisVal = this.value
    //                     if (this.getAttribute('name') == 'input-phone') {
    //                         $thisVal = $thisVal.replace(/\s+/g, '')
    //                     }
    //                     formData.append(this.getAttribute('name'), $thisVal)
    //                 })
    //                 formData.append('form-type', $this.attr('data-type'))
    //                 for (let [name, value] of formData) {
    //                     console.log(`${name} = ${value}`)
    //                     // alert(`${name} = ${value}`); // key1=value1, потом key2=value2
    //                 }

    //                 // Ajax-запрос тут можно написать


    //                 const RequestSuccess = $this.siblings('.request-success-wrapper'),
    //                     $thisFormHeight = $this.innerHeight()
    //                 RequestSuccess.fadeIn({
    //                     start: function () {
    //                         if (docWidth < 1200)
    //                             window.scrollTo(0, ($this.closest('.inline-request').offset().top - $('.header-outer').innerHeight()))
    //                         $this.hide()
    //                         $(this).css({
    //                             'height': $thisFormHeight + 'px',
    //                         })
    //                     },
    //                     /*   complete: function () {
    //                           console.log($this.offset().top)

    //                       } */
    //                 })
    //             }
    //             // e.preventDefault()
    //         })
    //         this.events(options.FormsElems)
    //     },
    //     events: function (forms) {
    //         // Функционал изменения input
    //         forms.on('input change', 'input[type="text"], input[type="checkbox"]', function (e) {
    //             var $this = $(this),
    //                 $thisInputWrapper = $this.closest('.default-input-wrapper')
    //             $thisInputWrapper.find('.invalid-text').remove()
    //             $thisInputWrapper.removeClass('invalid')

    //             // $this.val() != ''
    //             //     ? $this.addClass('active')
    //             //     : $this.removeClass('active')
    //         })
    //     }
    // }

    // if ($('.form-default').length) {
    //     Forms.submit()
    // }
    //------------------------------------

    const BtnFavorites = {
        defaultOptions: {
            btnWpapper: $('.btn-favorites')
        },
        init: function (options) {
            var options = $.extend(this.defaultOptions, options)
            this.events(options)
        },
        events: function (options) {
            options.btnWpapper.click(function (e) {
                e.preventDefault()
                const $this = $(this)
                $this.toggleClass('active')
            })
        }
    }
    if ($('.btn-favorites').length)
        BtnFavorites.init()



    if ($('.lightgallery').length > 0) {
        $('.lightgallery').lightGallery({
            share: false,
            selector: '.lightgallery-item', // новое 08.08.2022
            videojs: false,
            autoplayFirstVideo: false,
            download: false,
            videojs: false,
            thumbnail: false
            // exThumbImage: 'data-external-thumb-image'
        });
    }
    var SpaceNumber = function (NumberElem) {
        // const NumberElem = $('body').find('.this-number')
        NumberElem.each(function (index, element) {
            var valIn = $(this).text();
            var valInNew = valIn.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
            $(this).text(valInNew);
        });
    };
    // добавляем пробелы в числа во всех тегах с классом this-number
    if ($('.this-number').length) {
        const NumberElem = $('body').find('.this-number')
        SpaceNumber(NumberElem);
    }

    //----------------------//


    function CountHours(countWrapper) {
        this.defaultOptions = {
            countWrapper: countWrapper
        }
        this.init = function () {
            var options = this.defaultOptions
            // console.log(options)
            options.minus = options.countWrapper.find('.control.--min')
            options.plus = options.countWrapper.find('.control.--plus')
            options.count = options.countWrapper.find('.count')
            options.btnAdded = options.countWrapper.find('.btn-added')
            options.currentPrice = options.countWrapper.find('.finally-price .this-number')
            options.countPrice = parseInt(options.countWrapper.find('.finally-price').attr('data-price'))
            options.priceDiscount = parseInt(options.countWrapper.find('.finally-price').attr('data-discount'))
            options.cartWrapper = $('body').find('.header-nav_link.--cart')
            options.cardID = options.cartWrapper[0].cardID

            if (options.countWrapper.closest('.cart-item').length)
                options.deleteBtn = options.countWrapper.closest('.cart-item').find('.btn-delete')
            // console.log(options)
            this.events(options)
            // console.log(options)
        }
        this.events = function (options) {

            // функция расчёта стоимости заказа
            const EditCount = function (state) {
                let currentCount = parseInt(options.count.text()),
                    currentSumm = parseInt(options.currentPrice.text().replace(/\s+/g, ""))
                if (state == 'minus') {
                    if (currentCount > 0) currentCount = currentCount - 1
                }
                else {
                    currentCount = currentCount + 1
                    options.btnAdded.addClass('active')
                }

                if (currentCount == 0) options.btnAdded.removeClass('active')

                options.count.text(currentCount)
                currentSumm = currentCount * options.countPrice

                if (currentCount >= 3) {
                    const OldPrice = '<div class="old-price"><span class="this-number"></span> <span class="rub">q</span></div>'
                    if (!options.countWrapper.find('.old-price').length)
                        $(OldPrice).prependTo(options.currentPrice.closest('.finally-price'))
                    options.oldPrice = options.countWrapper.find('.old-price').find('.this-number')
                    options.oldPrice.text(currentSumm)
                    options.currentPrice.text(parseInt(options.oldPrice.text() * (100 - options.priceDiscount) / 100))
                    SpaceNumber(options.oldPrice)

                }
                else {
                    if (options.countWrapper.find('.old-price').length) options.countWrapper.find('.old-price').remove()
                    options.currentPrice.text(currentSumm)
                }
                SpaceNumber(options.currentPrice)
            }
            //----------------------//

            options.minus.click(function (e) {
                e.preventDefault()
                EditCount('minus')
            })
            options.plus.click(function (e) {
                e.preventDefault()
                EditCount('plus')
            })
            options.btnAdded.click(function (e) {
                if ($(this).hasClass('active') && !$(this).closest('.cart-item').length) {
                    e.preventDefault()
                    const CurrentCardId = $('body').find('section.card').attr('data-id')
                    if (!options.cardID.includes(CurrentCardId)) {
                        options.cardID.push(CurrentCardId)
                        console.log(options.cardID)
                        // console.log(options.cartWrapper)
                        let countCart
                        if (!options.cartWrapper.find('.count').length) {
                            countCart = "<span class='count'></span>"
                            $(countCart).prependTo(options.cartWrapper)
                            options.cartWrapper.find('.count').text('1')
                        }
                        else {
                            countCart = parseInt(options.cartWrapper.find('.count').text()) + 1
                            options.cartWrapper.find('.count').text(countCart)
                        }
                    }
                    ClearCartInfo($(this))
                }
                if ($(this).closest('.cart-item').length && $(this).hasClass('active')) {
                    DeleteCartItem($(this))
                }
            })
            if (options.deleteBtn) {
                // console.log(options.deleteBtn)
                options.deleteBtn.click(function (e) {
                    DeleteCartItem($(this))
                    // if ('')
                })
            }
            function DeleteCartItem(ActionBtn) {
                ActionBtn.closest('.cart-item').fadeOut({
                    complete: function () {
                        const CurrentCardId = $(this).attr('id')
                        if (options.cardID.includes(CurrentCardId)) {
                            options.cardID = options.cardID.filter(function (el) {
                                return !CurrentCardId.includes(el);
                            });
                        }
                        $(this).remove()
                        if (options.cartWrapper.find('.count').length) {
                            let Count = parseInt(options.cartWrapper.find('.count').text())
                            // console.log(Count)
                            Count == 1
                                ? options.cartWrapper.find('.count').remove()
                                : Count = Count - 1
                            // console.log(Count)
                            options.cartWrapper.find('.count').text(Count)
                        }
                        if (!$('body').find('.cart-item').length) {
                            EmptyCartInit()
                        }
                    }
                })

            }
            function ClearCartInfo(AddedBtn) {
                AddedBtn.removeClass('active')
                options.count.text('0')
                options.currentPrice.text('0')
                // console.log(options.oldPrice.closest('.old-price'))
                if (options.oldPrice != undefined)
                    options.oldPrice.closest('.old-price').remove()
            }
        }

    }

    function EmptyCartInit() {
        $('body').find('.cart-empty-wpapper').fadeIn({
            complete: function () {
                $(this).addClass('active')
            }
        })
    }

    if (!$('.cart-items_wrapper').length) EmptyCartInit()


    if ($('.added-card').length) {
        let AddedCard = []
        $('.added-card').each(function (index, elem) {
            AddedCard[index] = new CountHours($(elem))
            AddedCard[index].init()
        })
        // console.log(AddedCard)
    }


    function EmptyFavoritesInit() {
        $('body').find('.favorites-empty-wpapper').fadeIn({
            complete: function () {
                $(this).addClass('active')
            }
        })
    }

    if (!$('.favorites .catalog-items').length) EmptyFavoritesInit()


    $('body').on('click', '.favorites .catalog-item .btn-delete', function (e) {
        e.preventDefault()
        FavoritesDelete($(this))
    })


    function FavoritesDelete(BtnElem) {
        // console.log(CatalogItemsLength)
        BtnElem.closest('.catalog-item').fadeOut({
            complete: function () {
                $(this).remove()
                const CatalogItemsLength = $('body').find('.favorites .catalog-item').length
                if (CatalogItemsLength == 0) EmptyFavoritesInit()
            }
        })
    }
}) // end ready






$(window).on('resize', function () {
    // docWidth = document.body.clientWidth
    // console.log(docWidth)
})

