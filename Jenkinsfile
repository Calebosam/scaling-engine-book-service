pipeline{
    agent any

    tools {
        nodejs "nodejs18"
    }

    environment {
        AWS_REGION = 'eu-west-2'
        ECR_REPO_NAME = 'your-ecr-repo'
        IMAGE_TAG = ${env.BUILD_NUMBER}
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
                        sh """
                            docker -v
                            echo  '${IMAGE_TAG} ${ECR_REPO_NAME}'
                        """
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