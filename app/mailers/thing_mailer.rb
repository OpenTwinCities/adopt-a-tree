class ThingMailer < ActionMailer::Base
  default from: AppConfig.email.system.address

  def reminder(thing)
    @thing = thing
    @user = thing.user
    mail(to: thing.user.email, subject: ['Remember to water', thing.name].compact.join(' '))
  end

  def sign_up(user)
    @user = user
    mail(to: user.email, subject: 'Thank you for signing up!')
  end

  def adopt(thing)
    @thing = thing
    @user = thing.user
    mail(to: @user.email, subject: ['Thank you for adopting', thing.name].compact.join(' '))
  end

  def abandon(thing, user_id, name)
    @thing = thing
    @user = User.find user_id
    @name = name
    mail(to: @user.email, subject: 'Thank you for letting us know you can no longer care for your tree')
  end

end
