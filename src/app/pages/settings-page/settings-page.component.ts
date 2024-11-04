import { Component, effect, inject, ViewChild } from '@angular/core'
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component'
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { ProfileService } from '../../data/services/profile.service'
import { firstValueFrom } from 'rxjs'
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component'
import { Profile } from '../../data/interfaces/profile.interface'

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  })

  constructor() {
    effect(() => {
      this.form.patchValue({
        ...this.profileService.me(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        stack: this.mergeStack(this.profileService.me()?.stack),
      })
    })
  }

  onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) {
      console.log('Invalid')
      return
    }

    const formValue = {
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack),
    }

    const sanitizedFormValue = Object.fromEntries(
      Object.entries(formValue).map(([key, value]) => [
        key,
        value === null ? undefined : value,
      ])
    )

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar)
      )
    }

    firstValueFrom(
      this.profileService.patchProfile(sanitizedFormValue as Partial<Profile>)
    )
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return []
    if (Array.isArray(stack)) return stack

    return stack.split(',')
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if (!stack) return []
    if (Array.isArray(stack)) return stack.join(',')

    return stack
  }
}
