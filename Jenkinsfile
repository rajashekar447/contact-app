pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/rajashekar447/contact-app.git'
            }
        }

        stage('Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                sudo rm -rf /var/www/html/*
                sudo cp -r frontend/dist/* /var/www/html/
                '''
            }
        }

        stage('Restart Backend') {
            steps {
                sh 'sudo systemctl restart backend'
            }
        }

        stage('Restart Nginx') {
            steps {
                sh '''
                sudo nginx -t
                sudo systemctl restart nginx
                '''
            }
        }
    }
}
