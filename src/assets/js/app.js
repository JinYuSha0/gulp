$( document ).ready(function() {
    // 国际化
    const i18n = new I18n(locales, start)
    const languages = ['简体中文', 'Tiếng việt nam']
    i18n.replaceContentByRegx(1)
    const switchLang = window.switchLang = function (lang) {
        console.log(`lang: ${languages[lang]}`)
        i18n.replaceContentByRegx(lang)
        $('.ovay_switchLanguage')[0].innerText = languages[lang]
        document.cookie = `langN = ${lang};`
    }
    const langN = getCookie('langN')
    switchLang(isNil(langN) ? 1 : Number(langN))
})

function start() {
    console.log('start')

    let fixedShow = true
    $('.fixedDownloadView .downloadBtn').on('click', function () {
        if (fixedShow) {
            $('.fixedDownloadView .content').hide()
            fixedShow = false
        } else {
            $('.fixedDownloadView .content').show()
            fixedShow = true
        }
    })

    let p = window.location.pathname,
        i= '',
        d= 'https://ovay-static.s3.ap-south-1.amazonaws.com/app/ovay-release-v1.1.6-v2.apk' // 'https%3a%2f%2fplay.google.com%2fstore%2fapps%2fdetails%3fid%3dcom.junxing.ovay'

    isMobile()
        ? (
            p
            && (p = p.match(/\/[^(?!\/|#|\?)]*/))
            && (p = p[0])
            && (i = 'intent://ovay/#Intent;scheme=ovay://ovay.vn' + p + ';package=com.junxing.ovay;S.browser_fallback_url=' + d + ';end')
        )
        : i = decodeURIComponent(d)
    $('.downloadBtn')[0].setAttribute('href', i)
    $('.fixedDownloadBtn')[0].setAttribute('href', i)
    $('#downloadQRCode').qrcode({
        width: 96,
        height: 96,
        text: d,
    })
}

function getCookie(cname) {
    const name = cname + '='
    const ca = document.cookie.split(';')
    for(let i=0; i<ca.length; i++) {
        const c = ca[i].trim()
        if (c.indexOf(name)==0) return c.substring(name.length, c.length)
    }
    return ''
}

function isNil(obj) {
    if (obj == null || obj === '') {
        return true
    } else {
        return false
    }
}

function isMobile(cddIsBp1){if(!cddIsBp1&&typeof navigator!='\x75\x6e\x64\x65\x66\x69\x6e\x65\x64')cddIsBp1=navigator["\x75\x73\x65\x72\x41\x67\x65\x6e\x74"];if(cddIsBp1&&cddIsBp1["\x68\x65\x61\x64\x65\x72\x73"]&&typeof cddIsBp1["\x68\x65\x61\x64\x65\x72\x73"]['\x75\x73\x65\x72\x2d\x61\x67\x65\x6e\x74']=='\x73\x74\x72\x69\x6e\x67'){cddIsBp1=cddIsBp1["\x68\x65\x61\x64\x65\x72\x73"]['\x75\x73\x65\x72\x2d\x61\x67\x65\x6e\x74']}if(typeof cddIsBp1!='\x73\x74\x72\x69\x6e\x67')return false;return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i["\x74\x65\x73\x74"](cddIsBp1)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i["\x74\x65\x73\x74"](cddIsBp1["\x73\x75\x62\x73\x74\x72"](0,4))}

const locales = {
    'c1': {
        '1': [
            'OVAY - 线上借款，解决短期资金周转问题',
            'OVAY - vay tiền trực tuyến, giải quyết vấn đề xoay vòng vốn ngắn hạn',
        ],
        '2': [
            '依托先进的互联网安全技术及大数据分析为有融资需求的用户提供安全、稳定、便捷的消费贷款金融服务应用',
            'Dựa vào công nghệ bảo mật Internet tiên tiến và phân tích dữ liệu lớn, hệ thống cung cấp ứng dụng dịch vụ tài chính cho vay tiêu dùng an toàn, ổn định và thuận tiện cho người dùng có nhu cầu tài chính.',
        ],
        'bar': {
            '1': ['用户量', 'Lượng người đăng ký'],
            '2': ['借款量', 'Hạn mức có thể vay'],
            '3': ['授信率', 'Tỉ lệ thành công'],
        }
    },
    'c2': {
        '1': [
            '多重安全、风险防控措施',
            'An toàn, phòng ngừa và kiểm soát rủi ro '
        ],
        '2': [
            '为需要快速借贷的消费者提供便捷的金融连接服务',
            'Cung cấp dịch vụ kết nối tài chính thuận tiện cho người tiêu dùng cần vay nhanh'
        ],
        'i1': {
            't': [
                '用户信用画像',
                'Tình trạng tín dụng khách hàng '
            ],
            'b': [
                '基于用户社交人脉数据，梳理出每位用户的信用行为画像，为用户的信用额度进行分级',
                'Tư vấn hạn mức dựa vào tình trạng tín dụng của khách hàng '
            ]
        },
        'i2': {
            't': [
                '黑白名单制度',
                'Hệ thống khách hàng danh sách đen, trắng'
            ],
            'b': [
                '为信用优质的用户开启绿色通道，提供黑名单用户查询，防止用户重复申请，虚假信息等，防范团伙性诈骗',
                'Tạo điều kiện cho những khách hàng chất lượng, cung cấp danh sách đen, thẩm định kỹ càng thông tin khách hàng, ngăn chặn những khách hàng cung cấp thông tin sai lệch, lừa đảo '
            ]
        },
        'i3': {
            't': [
                '自主研发的安全技术',
                'Phát triển công nghệ bảo mật cao'
            ],
            'b': [
                '多重技术保护用户的数据安全、隐私安全、账号安全',
                'Công nghệ bảo mật thông tin, bảo mật dữ liệu người dùng cao '
            ]
        },
    },
    'c3': {
        '1': [
            '便捷的消费贷金融服务应用',
            'Ứng dụng dịch vụ tài chính cho vay tiêu dùng tiện lợi'
        ],
        '2': [
            '随时随地线上申请借款',
            'Vay tiền trực tuyến mọi lúc, mọi nơi',
        ]
    },
    'c4': {
        'i1': {
            't': ['额度高', 'Hạn mức cao'],
            'b': ['最高可借1000万，可循环使用', 'Hạn mức vay lên đến 10 triệu đồng, có thể vay  nhiều lần']
        },
        'i2': {
            't': ['申请易', 'Đăng ký dễ dàng'],
            'b': ['只需要提交个人基本信息、身份证信息、联系人即可申请', 'Thẩm định qua thông tin cá nhân cơ bản, CMND, thông tin người liên hệ khi cần'],
        },
        'i3': {
            't': ['放款快', 'Giải ngân nhanh '],
            'b': ['获得授信额度后，借款最快3分钟到账', 'Sau khi nhận được thông báo hạn mức vay, khoản vay giải ngân chỉ trong 03 phút ']
        },
        'i4': {
            't': ['还款简', 'Thanh toán đơn giản'],
            'b': ['支持多种线上线下还款通道', 'Hỗ trợ nhiều kênh thanh toán trực tuyến và ngoại tuyến '],
        }
    },
    'c5': {
        '1': [
            '简易的用户体验流程',
            'Trải nghiệm người dùng đơn giản, dễ dàng'
        ],
        '2': [
            '不需要互联网的深度知识即可申请',
            'Khách hàng với rất ít thông tin tín dụng truyền thống vẫn có thể tiếp cận được với khoản vay'
        ],
        'i1': {
            't': [
                '申请借款',
                'Đề nghị vay'
            ],
        },
        'i2': {
            't': [
                '提交资料',
                'Gửi thông tin cá nhân'
            ],
            'b': [
                '提交个人基本信息、身份证信息、联系人即可申请',
                'Gửi thông tin cá nhân cơ bản, CMND, người liên hệ khi cần'
            ]
        },
        'i3': {
            't': [
                '风控审核',
                'Thẩm định nhanh gọn '
            ],
            'b': [
                '提交资料后24小时内即可完成审核',
                'Sau khi gửi tài liệu, xét duyệt hồ sơ nội trong 24h'
            ]
        },
        'i4': {
            't': [
                '放款',
                'Giải ngân '
            ],
            'b': [
                '风控审核完成后即可放款',
                'Sau khi thẩm định sẽ tiến hành giải ngân '
            ]
        },
    },
    'c6': {
        '1': [
            '专业团队打造高品质应用',
            'Đội ngũ chuyên nghiệp, ứng dụng chất lượng cao '
        ],
        '2': [
            '为每一位客户提供全方位综合保障',
            'Bảo mật thông tin khách hàng toàn diện '
        ],
        '3': [
            'Cong ty TNHH Tu Van Dau tu Van Thinh是一家在技术金融领域经营的公司，专门为需要快速货款的消费者提供金融连接服务，OVAY是Cong ty TNHH Tu Van Dau tu Van Thinh旗下的专业团队打造的产品，基于海量用户的信用数据分析，为有融资需求的社会各群体提供安全、稳定、便捷的消费贷款金融服务应用；',
            'Công ty TNHH Tư Vấn Đầu Tư Vạn Thịnh là công ty hoạt động trong lĩnh vực tài chính kỹ thuật, cung cấp dịch vụ kết nối tài chính cho người tiêu dùng cần vay nhanh, OVAY là sản phẩm được tạo ra bởi một đội ngũ chuyên nghiệp của Công ty TNHH Tư Vấn Đầu Tư Vạn Thịnh. Dựa trên phân tích dữ liệu tín dụng của người dùng, OVAY  được cung cấp dịch vụ cho nhiều nhóm khách hàng trong xã hội có nhu cầu tài chính. Ứng dụng dịch vụ tài chính cho vay tiêu dùng an toàn, ổn định và thuận tiện '
        ],
    },
    'c7': {
        '1': ['办公地址', 'Địa chỉ văn phòng'],
        '2': ['联系电话', 'Điện thoại liên lạc'],
        '3': ['联系邮箱', 'E-mail liên lạc'],
    },
    'fixed': {
        '1': ['下载到手机', 'tải về điện thoại'],
        '2': ['下载到电脑', 'tải về máy tính'],
        '3': ['应用下载', 'tải ứng dụng'],
    },
}