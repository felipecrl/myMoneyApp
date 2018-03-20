import React, { Component } from 'react'

import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'

class BillingCycle extends Component {
    render() {
        return (
            <div>
                <ContentHeader title='Cadastro' subtitle='Ciclos de pagamento' />
                <Content>
                    Ciclos de pagamento
                </Content>
            </div>
        )
    }
}

export default BillingCycle