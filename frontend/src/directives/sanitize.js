import DOMPurify from 'dompurify'

export const sanitizeDirective = {
    mounted(el, binding) {
        const { value } = binding

        if (value) {
            // HTML içeriğini sanitize et
            const sanitized = DOMPurify.sanitize(value, {
                ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p', 'span', 'div'],
                ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
                ALLOW_DATA_ATTR: false
            })

            el.innerHTML = sanitized
        }
    },

    updated(el, binding) {
        const { value } = binding

        if (value) {
            const sanitized = DOMPurify.sanitize(value, {
                ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p', 'span', 'div'],
                ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
                ALLOW_DATA_ATTR: false
            })

            el.innerHTML = sanitized
        }
    }
}

// Global sanitize fonksiyonu
export const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p', 'span', 'div'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
        ALLOW_DATA_ATTR: false
    })
}