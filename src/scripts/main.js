import $ from 'jquery'
import xdomain from 'xdomain'
import Vue from 'vue'
import assign from 'object.assign'
import fullpageInit from './fullpage'
import questions from './questions'
import { buttonsInit, nextSection, nextSlide } from './common'
import introTpl from '../templates/intro.html'
import resultTpl from '../templates/result.html'
import modalTpl from '../templates/modal.html'
import questionTpl from '../templates/issue_question.html'
import rangeOptTpl from '../templates/range_opt.html'
import choiceOptTpl from '../templates/choice_opt.html'
import dropdownOptTpl from '../templates/dropdown_opt.html'

$(document).ready(() => {
  xdomain.slaves({
    'https://ss.initiumlab.com': '/proxy.html'
  })

  window.vueInstant = new Vue({
    el: 'body',
    data: {
      eventname: questions.slug,
      title : questions.title,
      subtitle : questions.subtitle,
      intro : questions.intro,
      privacy : questions.privacy,
      issues: questions.issues,
      globalStyles: questions.styles,
      moreQuizzes: questions.more_quizzes,
      showModal: false,
      bingo: false,
      modalText: '你答對了！'
    },
    components: {
      'intro': {
        template: introTpl,
        props: ['type', 'title', 'subtitle', 'description']
      },
      'result': {
        template: resultTpl,
        props: ['moreQuizzes']
      },
      'modal': {
        template: modalTpl,
        props: {
          show: {
            type: Boolean,
            required: true,
            twoWay: true,
          },
          text: {
            type: String,
            required: true,
          },
          bingo: {
            type: Boolean,
            required: false,
          }
        },
        methods: {
          handle_modal_click : function () {
            this.show = false
            const resultButtons = window.currentSlide.find('.js-show-result')
            if (resultButtons && resultButtons.length > 0) {
              nextSection()
            } else {
              nextSlide(window.currentSlide)
            }
          },
        }
      },
      'issue-question': {
        template: questionTpl,
        props: ['issue'],
      },
      'dropdown-options': {
        template: dropdownOptTpl,
        props: ['issue', 'issue_index'],
      },
      'range-options': {
        template: rangeOptTpl,
        props: ['issue', 'issue_index'],
      },
      'choice-options': {
        template: choiceOptTpl,
        props: ['issue', 'issue_index'],
      },
    },
    methods: {
      is_last_issue: function (index) {
        return (index + 1 ) < this.issues.length ? false : true
      }
    },
    ready: function () {
      fullpageInit()
      buttonsInit()
    }
  })
});