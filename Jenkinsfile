pipeline {
    agent any

    environment {
        APP_NAME = "contact-app"
        DEPLOY_DIR = "/opt/contact-app"
        JAR_NAME = "contact-app.jar"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/rajashekar447/contact-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Creating deployment directory..."
                    mkdir -p ${DEPLOY_DIR}

                    echo "Stopping old application if running..."
                    pkill -f ${JAR_NAME} || true

                    sleep 5

                    echo "Removing old jar..."
                    rm -f ${DEPLOY_DIR}/${JAR_NAME}

                    echo "Copying new jar..."
                    cp target/*.jar ${DEPLOY_DIR}/${JAR_NAME}

                    echo "Starting application..."
                    nohup java -jar ${DEPLOY_DIR}/${JAR_NAME} > ${DEPLOY_DIR}/app.log 2>&1 &

                    sleep 10

                    echo "Running processes:"
                    ps -ef | grep ${JAR_NAME} | grep -v grep
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
