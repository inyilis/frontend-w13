def dockerhub = 'inyilis/kfrontend'
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder 

pipeline {

    agent any

    parameters {
        string(name: 'DOCKERHUB', defaultValue: "${image_name}", description: 'by Inyilis Punya')
        booleanParam(name: 'RUNTEST', defaultValue: 'false', description: 'Testing image')
        choice(name: 'DEPLOY', choices: ['yes', 'no'], description: 'Build pakai param')
        booleanParam(name: 'ROLLOUT', defaultValue: 'false', description: 'Rollout image')
    }

    stages {
        stage("Install dependencies")  {
            when {
                expression {
                    params.DEPLOY == 'yes'
                }
            }
            steps {
                nodejs("node14") {
                    sh 'npm install'
                    // sh 'npm run build'
                }
            }
        }
        stage("Build docker image")  {
            when {
                expression {
                    params.DEPLOY == 'yes'
                }
            }
            steps {
                script {
                    builder = docker.build(image_name, "--no-cache .") 
                }
            }
        }
        stage("Testing image")  {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                script {
                    builder.inside {
                        sh 'echo passed'
                    }
                }
            }
        }
        stage("Push image")  {
            when {
                expression {
                    params.DEPLOY == 'yes'
                }
            }
            steps {
                script {
                    builder.push()
                }
            }
        }
        stage("Deploy")  {
            when {
                expression {
                    params.DEPLOY == 'yes'
                }
            }
            steps {
                script {
                    if(BRANCH_NAME == 'master'){
                        sshPublisher (
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'k8s',
                                    verbose: true,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: "cd /home/k8s/app; echo ' ' | sudo -S kubectl apply -f dev.yml --record; sudo kubectl rollout restart deployment.apps/frontend -n=development",
                                            execTimeout: 1200000
                                        )
                                    ] 
                                )
                            ]
                        )
                    }
                }
            }
        }
        stage("Rollout")  {
            when {
                expression {
                    params.ROLLOUT
                }
            }
            steps {
                script {
                    if(BRANCH_NAME == 'master'){
                        sshPublisher (
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'k8s',
                                    verbose: true,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: "cd /home/k8s/app; echo ' ' | sudo -S kubectl rollout undo deployment.apps/frontend -n=development",
                                            execTimeout: 1200000
                                        )
                                    ] 
                                )
                            ]
                        )
                    }
                }
            }
        }
    }
}