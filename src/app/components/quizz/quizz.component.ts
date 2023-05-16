import { Component, OnInit, DoCheck } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"
import quizz_questions2 from "../../../assets/data/quizz_questions2.json"
import { __values } from 'tslib';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = ""

  questions: any
  questionSelected: any

  answer: string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  pickQuestion:number = 1

  constructor() { }

  bntA(){
    this.pickQuestion = 1
    console.log(this.pickQuestion)
    this.ngDoChech()
  }
  
  bntB(){
    this.pickQuestion = 2
    console.log(this.pickQuestion)
    this.ngDoChech()
  }

  ngOnInit(): void {
      if(quizz_questions){
        this.finished = false
        this.title = quizz_questions.title
        
        this.questions = quizz_questions.questions
        this.questionSelected = this.questions[this.questionIndex]
  
        this.questionMaxIndex = this.questions.length
  
      }
  }

  ngDoChech(): void{
    if(this.pickQuestion === 1){
      if(quizz_questions){
        this.finished = false
        this.title = quizz_questions.title
        
        this.questions = quizz_questions.questions
        this.questionSelected = this.questions[this.questionIndex]
  
        this.questionMaxIndex = this.questions.length
  
      }
    }else{
      if(quizz_questions2){
        this.finished = false
        this.title = quizz_questions2.title
        
        this.questions = quizz_questions2.questions
        this.questionSelected = this.questions[this.questionIndex]
  
        this.questionMaxIndex = this.questions.length
  
      }
    }
  }

  playerChoose(value:string){
    this.answer.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answer)
      this.finished = true
      if(this.pickQuestion == 1){
        this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
      }
      if(this.pickQuestion == 2){
        this.answerSelected = quizz_questions2.results[finalAnswer as keyof typeof quizz_questions2.results ]
      }
    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }
}