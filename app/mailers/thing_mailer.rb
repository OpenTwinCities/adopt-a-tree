class ThingMailer < ActionMailer::Base
  default from: 'info@brewingabetterforest.com'

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
  end

  def abandon(thing)
  end

end
