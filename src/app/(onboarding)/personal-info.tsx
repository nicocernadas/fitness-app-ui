import { PrimaryButton } from "@/components/primary-button"
import { ScreenContainer } from "@/components/screen-container"
import { SelectField } from "@/components/select-field"
import { TextField } from "@/components/text-field"
import {
  ACTIVITY_LEVEL_DESCRIPTION,
  ACTIVITY_LEVEL_OPTION_DESCRIPTIONS,
  NEAT_DESCRIPTION,
  NEAT_OPTION_DESCRIPTIONS,
} from "@/constants/field-descriptions"
import { useSession } from "@/context/session-provider"
import { ActivityLevel } from "@/model/enums/ActivityLevel"
import { Gender } from "@/model/enums/Gender"
import { Neat } from "@/model/enums/NeatLevel"
import { useState } from "react"
import { Text } from "react-native"

export default function PersonalInfoScreen() {
  const { updateUser } = useSession()
  const [gender, setGender] = useState<Gender>(Gender.FEMALE)
  const [neat, setNeat] = useState<Neat>(Neat.LOW)
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(
    ActivityLevel.LIGHT,
  )
  const [weight, setWeight] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const [age, setAge] = useState<string>("")

  const handleSubmit = () => {}

  return (
    <ScreenContainer contentClassName="justify-center gap-4">
      <Text className="text-2xl font-bold">Personal Info</Text>
      <Text className="light-text">
        We need some details to calculate your plan accordingly
      </Text>

      <TextField
        label="Weight"
        unit="kgs"
        value={weight}
        onChangeText={setWeight}
      />

      <TextField
        label="Height"
        inputType="number"
        unit="cms"
        value={height}
        onChangeText={setHeight}
      />

      <TextField
        label="Age"
        inputType="number"
        value={age}
        onChangeText={setAge}
      />

      <SelectField
        label="Gender"
        options={Object.values(Gender)}
        value={gender}
        onChange={setGender}
      />

      <SelectField
        label="Neat level"
        options={Object.values(Neat)}
        value={neat}
        onChange={setNeat}
        description={NEAT_DESCRIPTION}
        optionDescriptions={NEAT_OPTION_DESCRIPTIONS}
      />

      <SelectField
        label="Activity level"
        options={Object.values(ActivityLevel)}
        value={activityLevel}
        onChange={setActivityLevel}
        description={ACTIVITY_LEVEL_DESCRIPTION}
        optionDescriptions={ACTIVITY_LEVEL_OPTION_DESCRIPTIONS}
      />
      <PrimaryButton title="Submit" onPress={handleSubmit} />
    </ScreenContainer>
  )
}
