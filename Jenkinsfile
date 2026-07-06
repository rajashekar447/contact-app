pipeline {

    agent any

    environment {
        APP_SERVER = "13.127.236.156"
        APP_USER = "ubuntu"
    }

    stages {

        stage('Checkout Source') {
            steps {
                echo "Checking out source code..."

                git branch: 'main',
                    url: 'https://github.com/rajashekar447/contact-app.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Deploy to Application Server') {
            steps {

                echo "Deploying application..."

                sh """
                ssh -o StrictHostKeyChecking=no ${APP_USER}@${APP_SERVER} '
                cd /home/ubuntu/contact-app &&
                ./deploy.sh
                '
                """
            }
        }
    }

    post {

        success {
            echo "Deployment completed successfully."
        }

        failure {
            echo "Deployment failed."
        }

        always {
            echo "Pipeline execution finished."
        }
    }
}
