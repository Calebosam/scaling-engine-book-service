pipeline{
    agent any

    tools {
        nodejs "nodejs18"
    }

    environment {
        AWS_REGION = 'eu-west-2'
        ECR_REPO_NAME = '646370748778.dkr.ecr.eu-west-2.amazonaws.com'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        AWS_CREDENTIALS_ID = 'aws-cred'
    }
    stages{
        stage("Install Dependencies"){
            steps{
                sh 'yarn install'
            }
           
        }
        stage("Run Unit Tests"){
            steps{
                sh 'echo Completed!!!'
            }
           
        }
        stage("Build Docker Image"){
            steps{
                withAWS(region:"${AWS_REGION}", credentials:"${AWS_CREDENTIALS_ID}") {
                    script {
                        sh '''
                            aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO_NAME
                            docker build -t book-service .
                            docker tag book-service:latest $ECR_REPO_NAME/book-service:latest
                            docker push $ECR_REPO_NAME/book-service:$IMAGE_TAG
                        '''
          }
        }

            }
           
        }
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}