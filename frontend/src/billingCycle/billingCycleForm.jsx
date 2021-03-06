import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './billingCycleActions'
import labelAndInput from '../common/form/labelAndInput'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {

  calculateSummary() {
    const sum = (t, v) => t + v
    return {
      sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
      sumOfDebits: this.props.debits.map(d => +d.value || 0).reduce(sum)
    }
  }

  render() {
    const { handleSubmit, readOnly, credits, debits } = this.props
    const { sumOfCredits, sumOfDebits } = this.calculateSummary()
    return (
      <form role='form' onSubmit={handleSubmit}>
        <div className='box-body'>
          <Field
            cols='12, 4'
            name='name'
            component={labelAndInput}
            label='Nome'
            placeholder='Informe o nome'
            readOnly={readOnly}
            type='text'
          />
          <Field 
            cols='12, 4'
            name='month'
            component={labelAndInput}
            label='Mês'
            placeholder='Informe o Mês'
            readOnly={readOnly}
            type='number'
          />
          <Field 
            cols='12, 4'
            name='year'
            component={labelAndInput}
            label='Ano'
            placeholder='Informe o Ano'
            readOnly={readOnly}
            type='number'
          />
          <Summary credit={sumOfCredits} debit={sumOfDebits} />
          <ItemList 
            cols='12 6' 
            readOnly={readOnly} 
            list={credits} 
            field='credits'
            legend='Créditos'
          />
          <ItemList 
            cols='12 6' 
            readOnly={readOnly} 
            list={debits} 
            field='debits'
            legend='Débitos'
            showStatus={true}
          />
        </div>
        <div className='box-footer'>
          <button type='submit' className={`btn btn-${this.props.submitClass}`}>
            {this.props.submitLabel}
          </button>
          <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
        </div>
      </form>
    )
  }
}

BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm)
const selector = formValueSelector('billingCycleForm')

const mapStateToProps = state => ({credits: selector(state, 'credits'), debits: selector(state, 'debits')})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)