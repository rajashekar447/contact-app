pipeline {
    agent any

    environment {
        DEPLOY_SERVER = "ubuntu@13.233.231.180"
    }

    stages {

        stage('Checkout') {
            steps {
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

        stage('Install Frontend Dependencies') {
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

        stage('Copy Project') {
            steps {
                sh '''
                rsync -avz --delete ./ $DEPLOY_SERVER:/home/ubuntu/contact-app/
                '''
            }
        }

        stage('Restart Backend') {
            steps {
                sh '''
                ssh $DEPLOY_SERVER "
                cd /home/ubuntu/contact-app/backend &&
                npm install &&
                sudo systemctl restart backend
                "
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                ssh $DEPLOY_SERVER "
                cd /home/ubuntu/contact-app/frontend &&
                npm install &&
                npm run build &&
                sudo rm -rf /var/www/html/* &&
                sudo cp -r dist/* /var/www/html/
                "
                '''
            }
        }

        stage('Restart Nginx') {
            steps {
                sh '''
                ssh $DEPLOY_SERVER "
                sudo nginx -t &&
                sudo systemctl restart nginx
                "
                '''
            }
        }
    }
}
